import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useLanguage, Locale } from '@/contexts/LanguageContext';
import { useSession } from '@/contexts/SessionContext';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

// Type assertion helper for Supabase queries
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const supabaseAny = supabase as any;
import { useToast } from "@/hooks/use-toast";
import { useMutation } from '@tanstack/react-query';
import { Loader2, AlertCircle, Sparkles, TrendingUp, Star, Lightbulb } from 'lucide-react';
import useMajorScorer, { Answer as ScorerAnswer, MAJOR_NAMES, MajorRecommendation } from '@/hooks/useMajorScorer';
import { Program as CatalogProgram, pickPrograms } from '@/lib/programCatalog';
import { getBadgeForMajor } from '@/configs/BadgeMap';
import html2canvas from 'html2canvas';

import questionsConfigJson from '@/configs/scorer_questions.json';

// Types from scorer_questions.json for better clarity
interface ScorerQuestion {
  id: string;
  type: 'rank' | 'single' | 'scale';
  category?: string;
  prompt_en: string;
  prompt_ar?: string;
  options?: string[] | Record<string, string>;
  options_en?: Record<string, string>;
  options_ar?: Record<string, string>;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  labels_en?: Record<string, string>;
  labels_ar?: Record<string, string>;
}

const scorerQuestionsConfig: ScorerQuestion[] = questionsConfigJson as ScorerQuestion[];

interface UiOption {
  id: string;
  label: string;
}
interface UiQuestion {
  id: string;
  prompt: string;
  type: 'rank' | 'single' | 'scale';
  options?: UiOption[];
  maxSelections?: number;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
}

type RawAnswerValue = string | string[] | number | undefined;

// Helper function to detect if text is primarily Arabic
const isArabicText = (text: string): boolean => {
  const arabicPattern = /[\u0600-\u06FF]/g;
  const arabicMatches = text.match(arabicPattern) || [];
  // Consider text as Arabic if more than 30% of characters are Arabic
  return arabicMatches.length > text.length * 0.3;
};

// Simple markdown renderer for bold text (**text** -> <strong>text</strong>)
const renderFormattedText = (text: string): React.ReactNode => {
  // Split by **text** pattern and render with bold formatting
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      // Remove the ** and wrap in strong tag
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

interface QuizContentProps {
  userName: string;
  userPhone: string;
  onReset: () => void;
}

// Component for displaying a single major recommendation
const MajorRecommendationCard: React.FC<{
  major: MajorRecommendation;
  rank: number;
  language: Locale;
  majorName: { en: string; ar: string };
}> = ({ major, rank, language, majorName }) => {
  const isRTL = language === 'ar';
  const reasons = language === 'ar' ? major.reasons.ar : major.reasons.en;

  const getRankBadge = () => {
    switch (rank) {
      case 1:
        return { bg: 'bg-gradient-to-r from-yellow-400 to-amber-500', text: '🥇', label: isRTL ? 'الأول' : '1st' };
      case 2:
        return { bg: 'bg-gradient-to-r from-gray-300 to-gray-400', text: '🥈', label: isRTL ? 'الثاني' : '2nd' };
      case 3:
        return { bg: 'bg-gradient-to-r from-amber-600 to-orange-700', text: '🥉', label: isRTL ? 'الثالث' : '3rd' };
      default:
        return { bg: 'bg-gradient-to-r from-primary to-secondary', text: `${rank}`, label: `${rank}` };
    }
  };

  const badge = getRankBadge();

  return (
    <div className={cn(
      "p-5 rounded-xl border-2 transition-all duration-300 hover:shadow-lg",
      rank === 1 ? "border-yellow-400 bg-yellow-50/50 dark:bg-yellow-900/10" :
      rank === 2 ? "border-gray-300 bg-gray-50/50 dark:bg-gray-900/10" :
      "border-orange-300 bg-orange-50/50 dark:bg-orange-900/10"
    )}>
      <div className={cn("flex items-start gap-4", isRTL && "flex-row-reverse")}>
        {/* Rank Badge */}
        <div className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shrink-0",
          badge.bg
        )}>
          <span className="text-xl">{badge.text}</span>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-2">
          <div className={cn("flex items-center justify-between flex-wrap gap-2", isRTL && "flex-row-reverse")}>
            <h4 className="text-lg font-bold text-foreground">
              {language === 'ar' ? majorName.ar : majorName.en}
            </h4>
            <div className={cn(
              "flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold",
              major.matchScore >= 80 ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
              major.matchScore >= 65 ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" :
              "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
            )}>
              <TrendingUp className="w-4 h-4" />
              <span>{major.matchScore}/100</span>
            </div>
          </div>

          {/* Reasons */}
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              {isRTL ? 'لماذا هذا التخصص:' : 'Why this major:'}
            </p>
            <ul className={cn("text-sm text-foreground space-y-1", isRTL && "text-right")}>
              {reasons.map((reason, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Wildcard Suggestion Card
const WildcardCard: React.FC<{
  major: MajorRecommendation;
  language: Locale;
  majorName: { en: string; ar: string };
}> = ({ major, language, majorName }) => {
  const isRTL = language === 'ar';
  const reasons = language === 'ar' ? major.reasons.ar : major.reasons.en;

  return (
    <div className="p-5 rounded-xl border-2 border-dashed border-purple-400 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10">
      <div className={cn("flex items-start gap-4", isRTL && "flex-row-reverse")}>
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white shrink-0">
          <Lightbulb className="w-6 h-6" />
        </div>
        <div className="flex-1 space-y-2">
          <div className={cn("flex items-center gap-2 flex-wrap", isRTL && "flex-row-reverse")}>
            <span className="text-xs font-semibold px-2 py-1 bg-purple-200 text-purple-700 dark:bg-purple-800 dark:text-purple-200 rounded-full">
              {isRTL ? '✨ اقتراح مفاجئ' : '✨ Wildcard'}
            </span>
            <h4 className="text-lg font-bold text-foreground">
              {language === 'ar' ? majorName.ar : majorName.en}
            </h4>
          </div>
          <p className="text-sm text-muted-foreground italic">
            {reasons[0]}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {isRTL ? 'درجة التطابق:' : 'Match Score:'}
            </span>
            <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
              {major.matchScore}/100
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const QuizContent: React.FC<QuizContentProps> = ({ userName, userPhone, onReset }) => {
  const { language, t } = useLanguage();
  const { sessionId, setSessionId } = useSession();
  const { toast } = useToast();

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [rawAnswers, setRawAnswers] = useState<Record<string, RawAnswerValue>>(() => {
    try {
      const savedAnswers = sessionStorage.getItem('quizAnswers');
      return savedAnswers ? JSON.parse(savedAnswers) : {};
    } catch (error) {
      console.error("Failed to parse answers from sessionStorage", error);
      return {};
    }
  });

  const [scorerAnswers, setScorerAnswers] = useState<ScorerAnswer[]>([]);
  const computedScorerResult = useMajorScorer(scorerAnswers);

  const [recommendedPrograms, setRecommendedPrograms] = useState<CatalogProgram[]>([]);
  const [isLoadingResults, setIsLoadingResults] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState<boolean>(false);
  const aiCallMadeRef = useRef<boolean>(false);
  const programsSetRef = useRef<boolean>(false);
  const sessionSubmittedRef = useRef<boolean>(false);

  const componentRef = useRef<HTMLDivElement>(null);
  const resultCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      sessionStorage.setItem('quizAnswers', JSON.stringify(rawAnswers));
    } catch (error) {
      console.error("Failed to save answers to sessionStorage", error);
    }
  }, [rawAnswers]);

  const uiQuestions: UiQuestion[] = useMemo(() => {
    return scorerQuestionsConfig.map((q): UiQuestion => {
      let mappedOptions: UiOption[] | undefined = undefined;
      if (q.type === 'rank' && Array.isArray(q.options)) {
        mappedOptions = q.options.map((optId: string) => ({
          id: optId,
          label: t(`question.${q.id}.options.${optId}`, optId),
        }));
      } else if (q.type === 'single') {
        const optSource = language === 'ar' && q.options_ar ? q.options_ar : q.options_en;
        if (optSource) {
          mappedOptions = Object.entries(optSource).map(([optId, optLabel]: [string, string]) => ({
            id: optId,
            label: t(`question.${q.id}.options.${optId}`, optLabel),
          }));
        } else if (Array.isArray(q.options)) {
          mappedOptions = q.options.map((optId: string) => ({
            id: optId,
            label: t(`question.${q.id}.options.${optId}`, optId),
          }));
        }
      }
      return {
        id: q.id,
        prompt: language === 'ar' && q.prompt_ar ? q.prompt_ar : q.prompt_en,
        type: q.type,
        options: mappedOptions,
        maxSelections: q.id === 'SUBJECTS' ? 3 : undefined,
        min: q.min,
        max: q.max,
        step: q.step,
        defaultValue: q.defaultValue,
      };
    });
  }, [language, t]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionIdFromUrl = params.get('session');
    if (sessionIdFromUrl && !sessionId) {
      setIsLoadingResults(true);
      supabaseAny.from('quiz_sessions').select('*').eq('id', sessionIdFromUrl).single()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then(({ data, error }: any) => {
          if (error) {
            toast({ title: t('errors.sessionLoadFailed', 'Session Load Failed'), description: error.message, variant: 'destructive' });
            setIsLoadingResults(false);
          } else if (data) {
            const loadedRawAnswers = (data.answers as Record<string, RawAnswerValue>) || {};
            setRawAnswers(loadedRawAnswers);
            const answersForScorer = Object.entries(loadedRawAnswers).map(([questionId, value]) => ({ questionId, value: value as string | string[] | number }));
            setScorerAnswers(answersForScorer);
            setSessionId(sessionIdFromUrl);
            setCompleted(true);
            setIsLoadingResults(false);
          }
        });
    } else if (Object.keys(rawAnswers).length > 0) {
      const wasCompleted = sessionStorage.getItem('quizCompleted');
      if (wasCompleted === 'true') {
        const finalScorerAnswers = Object.entries(rawAnswers).map(([questionId, value]) => ({ questionId, value }));
        setScorerAnswers(finalScorerAnswers);
        setCompleted(true);
      }
    }
  }, [sessionId, setSessionId, t, toast, rawAnswers]);

  useEffect(() => {
    if (!completed && componentRef.current && currentStep < uiQuestions.length) {
      const questionElement = document.getElementById(`question-${uiQuestions[currentStep].id}`);
      questionElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentStep, completed, uiQuestions]);

  const { mutate: submitSession, isPending: isSubmittingSession } = useMutation({
    mutationFn: async () => {
      if (!computedScorerResult || !computedScorerResult.sortedMajors || computedScorerResult.sortedMajors.length === 0) {
        throw new Error("Scorer result not available for submission.");
      }
      const rawGradeValue = rawAnswers['GRADE_BAND'] as string | undefined;
      let gradeValue: number | null = null;
      if (rawGradeValue === "below_60") gradeValue = 55;
      else if (rawGradeValue === "60_70") gradeValue = 65;
      else if (rawGradeValue === "70_80") gradeValue = 75;
      else if (rawGradeValue === "80_90") gradeValue = 85;
      else if (rawGradeValue === "above_90") gradeValue = 93;

      const highestTuitionValue = rawAnswers['HIGHEST_TUITION'] !== undefined ? Number(rawAnswers['HIGHEST_TUITION']) : null;
      const topPrograms = pickPrograms(computedScorerResult.sortedMajors);

      const topMajorSlug = computedScorerResult.sortedMajors[0].slug;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: majorExists }: any = await supabaseAny.from('majors')
        .select('slug')
        .eq('slug', topMajorSlug)
        .maybeSingle();

      const validatedMajorSlug = majorExists ? topMajorSlug : null;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const payload: any = {
        user_name: userName,
        user_phone: userPhone,
        answers: rawAnswers,
        grade_band: gradeValue,
        top_major_slug: validatedMajorSlug,
        badge_slug: validatedMajorSlug,
        highest_tuition: highestTuitionValue,
        top_programs: topPrograms.map(p => p.title),
        ai_explanation: computedScorerResult.psychologicalProfile.profileSummary[language as 'en' | 'ar']
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: newSession, error }: any = await supabaseAny.from('quiz_sessions').insert([payload]).select('id').single();
      if (error) {
        console.error('Database insertion error:', error);
        await supabaseAny.from('analytics_events').insert({
          session_id: null,
          event_type: 'db_save_error',
          event_data: { error: error.message, payload }
        });
        throw error;
      }
      if (!newSession) throw new Error("Failed to create a new session.");
      return newSession;
    },
    onSuccess: (newSession) => {
      setSessionId(newSession.id);
      const url = new URL(window.location.href);
      url.searchParams.set('session', newSession.id);
      window.history.replaceState({ ...window.history.state, as: url.href, url: url.href }, '', url.href);
    },
    onError: (error) => {
      toast({ title: t('errors.supabaseSaveError', 'خطأ في حفظ قاعدة البيانات'), description: error.message, variant: 'destructive' });
    },
  });

  // Fetch AI recommendation when quiz is completed - uses ref to prevent re-renders
  const fetchAIRecommendation = async () => {
    if (!computedScorerResult || !computedScorerResult.sortedMajors?.length) {
      console.log('AI: No scorer result available');
      return;
    }
    
    if (aiCallMadeRef.current) {
      console.log('AI: Call already made, skipping');
      return;
    }
    
    aiCallMadeRef.current = true;
    setIsLoadingAI(true);
    
    try {
      const topPrograms = pickPrograms(computedScorerResult.sortedMajors);
      
      // Build enriched answers with question labels
      const enrichedAnswers = Object.entries(rawAnswers).map(([questionId, value]) => {
        const question = scorerQuestionsConfig.find(q => q.id === questionId);
        return {
          questionId,
          value,
          questionLabel: question?.prompt_en || questionId,
          displayValue: Array.isArray(value) ? value.join(', ') : String(value)
        };
      });
      
      // Get boosters from psychological profile
      const boosters = computedScorerResult.psychologicalProfile?.profileSummary 
        ? [computedScorerResult.psychologicalProfile.profileSummary.en]
        : [];
      
      // Use Promise.race for timeout since AbortController doesn't work with supabase.functions.invoke
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('AI request timed out')), 15000)
      );
      
      const fetchPromise = supabaseAny.functions.invoke('generate-ai-recommendation', {
        body: {
          userName,
          answers: enrichedAnswers,
          topPrograms: topPrograms.map(p => ({ title: p.title })),
          boosters,
          language  // Pass the current UI language to ensure AI responds in correct language
        }
      });
      
      const { data, error } = await Promise.race([fetchPromise, timeoutPromise]) as { data: any; error: any };
      
      if (error) {
        console.error('AI function error:', error);
        toast({
          title: t('results.aiUnavailable', language === 'ar' ? 'التوصيات الذكية غير متاحة حالياً' : 'AI insights temporarily unavailable'),
          variant: 'default'
        });
      } else if (data?.error) {
        console.error('AI response error:', data.error);
        if (data.status === 429 || data.status === 402) {
          toast({
            title: t('results.aiUnavailable', language === 'ar' ? 'التوصيات الذكية غير متاحة حالياً' : 'AI insights temporarily unavailable'),
            variant: 'default'
          });
        }
      } else if (data?.aiExplanation) {
        setAiExplanation(data.aiExplanation);
        sessionStorage.setItem('aiExplanation', data.aiExplanation);
      }
    } catch (err) {
      console.error('AI recommendation error:', err);
      // Silently fail - algorithm recommendations are still shown
    } finally {
      setIsLoadingAI(false);
    }
  };

  // Effect to handle quiz completion - uses ref to prevent infinite loop
  useEffect(() => {
    // Guard: only run once when completed becomes true and we have results
    if (!completed || programsSetRef.current) {
      return;
    }

    if (!computedScorerResult || !computedScorerResult.sortedMajors?.length) {
      return;
    }

    // Mark as set to prevent re-running
    programsSetRef.current = true;

    const finalPrograms = pickPrograms(computedScorerResult.sortedMajors);
    setRecommendedPrograms(finalPrograms);
    sessionStorage.setItem('quizCompleted', 'true');

    // Try to load cached AI explanation first
    const cachedAI = sessionStorage.getItem('aiExplanation');
    if (cachedAI) {
      setAiExplanation(cachedAI);
    } else if (!aiCallMadeRef.current) {
      fetchAIRecommendation();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completed, computedScorerResult]);

  // Effect to submit session - uses ref to prevent infinite loop
  useEffect(() => {
    // Guard: only submit once
    if (sessionSubmittedRef.current) {
      return;
    }

    if (!completed || sessionId || !computedScorerResult?.sortedMajors?.length) {
      return;
    }

    // Mark as submitted to prevent re-running
    sessionSubmittedRef.current = true;
    submitSession();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completed, sessionId, computedScorerResult]);

  const handleAnswerChange = (questionId: string, value: RawAnswerValue) => {
    setRawAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleCheckboxChange = (qId: string, optId: string, checked: boolean, maxSel?: number) => {
    setRawAnswers(prev => {
      const current: string[] = Array.isArray(prev[qId]) ? prev[qId] as string[] : [];
      let newAns = checked ? [...current, optId] : current.filter(item => item !== optId);
      if (checked && maxSel && newAns.length > maxSel) {
        toast({ description: t('errors.maxSelectionDesc', `Please select up to ${maxSel} options.`, { count: maxSel }) });
        newAns = newAns.slice(newAns.length - maxSel);
      }
      return { ...prev, [qId]: newAns };
    });
  };

  const handleNext = () => {
    const q = uiQuestions[currentStep];
    const ans = rawAnswers[q.id];
    if (ans === undefined || (Array.isArray(ans) && ans.length === 0)) {
      toast({ title: t('errors.answerRequiredTitle', 'Answer Required'), variant: 'destructive' }); return;
    }
    if (q.id === 'SUBJECTS' && q.maxSelections && (!Array.isArray(ans) || ans.length !== q.maxSelections)) {
      toast({ description: t('errors.rankSelectionDesc', `Please select exactly ${q.maxSelections} options.`, { count: q.maxSelections }), variant: 'destructive' }); return;
    }
    if (currentStep < uiQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const finalScorerAnswers = Object.entries(rawAnswers).map(([questionId, value]) => ({ questionId, value }));
      setScorerAnswers(finalScorerAnswers);
      setCompleted(true);
    }
  };

  const handleBack = () => { if (currentStep > 0) setCurrentStep(currentStep - 1); };

  const logCtaEvent = (type: string, meta = {}) => {
    if (!sessionId) {
      console.warn('Cannot log event: sessionId is null');
      return;
    }
    supabaseAny.from('analytics_events').insert({ session_id: sessionId, event_type: type, event_data: meta }).then();
  };

  const handleShare = async () => {
    if (!resultCardRef.current || !sessionId) { toast({ title: t('errors.shareNotReady', 'Not ready to share.'), variant: 'destructive' }); return; }
    logCtaEvent('share_attempt');
    try {
      const scale = 2;
      const canvas = await html2canvas(resultCardRef.current, {
        useCORS: true,
        logging: false,
        scale: scale,
        backgroundColor: '#ffffff',
      });
      const file = await new Promise<File | null>(resolve => canvas.toBlob(blob => blob ? resolve(new File([blob], 'recommendation.png', { type: 'image/png' })) : resolve(null), 'image/png'));
      if (!file) throw new Error("Canvas to blob failed");
      const deepLink = `${window.location.origin}/?session=${sessionId}`;

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({ title: t('share.title', 'My Major Recommendation'), text: t('share.text', 'Check out my results!'), files: [file] });
          logCtaEvent('share_success', { method: 'webshare-files' });
        } catch (err) {
          if ((err as Error).name !== 'AbortError') {
            logCtaEvent('share_failed', { error: (err as Error).message });
          }
        }
      } else if (navigator.share) {
        try {
          await navigator.share({ title: t('share.title', 'My Major Recommendation'), text: t('share.text', 'Check out my results!'), url: deepLink });
          logCtaEvent('share_success', { method: 'webshare-url' });
        } catch (err) {
          if ((err as Error).name !== 'AbortError') {
            logCtaEvent('share_failed', { error: (err as Error).message });
          }
        }
      } else {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(file);
        a.download = 'qobouli-recommendation.png';
        a.click();
        await navigator.clipboard.writeText(deepLink);
        toast({ title: t('share.linkCopiedTitle', 'Link Copied!'), description: t('share.linkCopiedDesc', 'Image downloaded and link copied.') });
        logCtaEvent('share_success', { method: 'download-clipboard' });
      }
    } catch (err) {
      toast({ title: t('errors.shareFailed', 'Share Failed'), variant: 'destructive' });
      logCtaEvent('share_failed', { error: (err as Error).message });
    }
  };

  const resetTool = () => {
    if (sessionId) logCtaEvent('restart');
    sessionStorage.removeItem('quizAnswers');
    sessionStorage.removeItem('quizCompleted');
    sessionStorage.removeItem('aiExplanation');
    // Reset all refs to allow fresh run
    aiCallMadeRef.current = false;
    programsSetRef.current = false;
    sessionSubmittedRef.current = false;
    setAiExplanation(null);
    onReset();
  };

  if (isLoadingResults && !completed) return (
    <div className="flex justify-center items-center h-screen">
      <Loader2 className="h-16 w-16 animate-spin text-blue-600" />
      <p className="ml-3 text-lg">{t('loading.session', 'Loading session...')}</p>
    </div>
  );

  if (completed) {
    const isProcessing = isLoadingResults || isSubmittingSession;
    const hasResults = !isProcessing && computedScorerResult && computedScorerResult.sortedMajors && computedScorerResult.sortedMajors.length > 0;
    const topMajors = hasResults ? computedScorerResult.sortedMajors.slice(0, 3) : [];
    const topMajor = hasResults ? computedScorerResult.sortedMajors[0] : null;
    const badge = topMajor ? getBadgeForMajor(topMajor.slug) : null;
    const psychProfile = hasResults ? computedScorerResult.psychologicalProfile : null;
    const wildcardMajor = hasResults ? computedScorerResult.wildcardMajor : null;
    const isRTL = language === 'ar';

    return (
      <div ref={componentRef} className="w-full max-w-4xl mx-auto p-4 md:p-6 animate-fade-in" dir={isRTL ? 'rtl' : 'ltr'}>
        <Card ref={resultCardRef} className="quiz-card shadow-2xl border-0 overflow-hidden">
          <CardHeader className="text-center bg-gradient-to-r from-primary/10 to-secondary/10 pb-8">
            <div className="flex justify-center mb-4">
              <Sparkles className="w-8 h-8 text-primary animate-pulse" />
            </div>
            <CardTitle className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t('results.title', isRTL ? 'نتائجك' : 'Your Results')}
            </CardTitle>
            <CardDescription className="text-base mt-2">
              {t('results.subtitle', isRTL ? 'بناءً على إجاباتك، إليك توصياتنا المخصصة' : 'Based on your responses, here are your personalized recommendations')}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8 p-6">
            {isProcessing ? (
              <div className="flex flex-col justify-center items-center py-12">
                <Loader2 className="h-16 w-16 animate-spin text-primary mb-4" />
                <p className="text-lg text-muted-foreground">{t('results.loading', isRTL ? 'جاري تحميل النتائج...' : 'Loading results...')}</p>
              </div>
            ) : hasResults && topMajor && badge ? (
              <>
                {/* Badge Display */}
                <div className="mb-6 p-6 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl text-center animate-scale-in border border-primary/20">
                  <span className="text-6xl mb-3 block animate-bounce">{badge.emoji}</span>
                  <p className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {language === 'ar' ? badge.label_ar : badge.label_en}
                  </p>
                </div>

                {/* Psychological Profile Section */}
                {psychProfile && (
                  <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/10 dark:to-purple-900/10 rounded-xl border border-indigo-200 dark:border-indigo-800 space-y-3">
                    <div className={cn("flex items-center gap-2", isRTL && "flex-row-reverse")}>
                      <Star className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      <h3 className="text-lg font-semibold text-indigo-800 dark:text-indigo-300">
                        {isRTL ? 'ملفك الشخصي النفسي' : 'Your Psychological Profile'}
                      </h3>
                    </div>
                    <p className={cn("text-foreground leading-relaxed", isRTL && "text-right")}>
                      {language === 'ar' ? psychProfile.profileSummary.ar : psychProfile.profileSummary.en}
                    </p>
                  </div>
                )}

                {/* AI Insights Section */}
                {isLoadingAI && (
                  <div className="p-6 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/10 dark:to-teal-900/10 rounded-xl border border-green-200 dark:border-green-800 space-y-3">
                    <div className={cn("flex items-center gap-2", isRTL && "flex-row-reverse")}>
                      <Sparkles className="w-5 h-5 text-green-600 dark:text-green-400 animate-pulse" />
                      <h3 className="text-lg font-semibold text-green-800 dark:text-green-300">
                        {t('results.generatingAI', isRTL ? 'جاري إنشاء التوصيات الشخصية...' : 'Generating personalized insights...')}
                      </h3>
                    </div>
                    <div className="flex justify-center py-4">
                      <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                    </div>
                  </div>
                )}

                {aiExplanation && !isLoadingAI && (
                  <div className="p-6 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/10 dark:to-teal-900/10 rounded-xl border border-green-200 dark:border-green-800 space-y-3">
                    <div className={cn("flex items-center gap-2", isRTL && "flex-row-reverse")}>
                      <Sparkles className="w-5 h-5 text-green-600 dark:text-green-400" />
                      <h3 className="text-lg font-semibold text-green-800 dark:text-green-300">
                        {t('results.aiInsights', isRTL ? 'توصيات ذكية' : 'AI Insights')}
                      </h3>
                    </div>
                    {/* Detect AI text language and apply correct text direction */}
                    <p
                      className={cn(
                        "text-foreground leading-relaxed whitespace-pre-line",
                        isArabicText(aiExplanation) ? "text-right" : "text-left"
                      )}
                      dir={isArabicText(aiExplanation) ? "rtl" : "ltr"}
                    >
                      {renderFormattedText(aiExplanation)}
                    </p>
                  </div>
                )}

                {/* Top 3 Recommended Majors */}
                <div className="space-y-4">
                  <div className={cn("flex items-center gap-2", isRTL && "flex-row-reverse")}>
                    <div className="w-1 h-8 bg-gradient-to-b from-primary to-secondary rounded-full"></div>
                    <h3 className="text-xl font-bold">
                      {isRTL ? 'أفضل 3 تخصصات موصى بها' : 'Top 3 Recommended Majors'}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {topMajors.map((major, index) => (
                      <MajorRecommendationCard
                        key={major.slug}
                        major={major}
                        rank={index + 1}
                        language={language as Locale}
                        majorName={MAJOR_NAMES[major.slug] || { en: major.slug, ar: major.slug }}
                      />
                    ))}
                  </div>
                </div>

                {/* Wildcard Suggestion */}
                {wildcardMajor && (
                  <div className="space-y-4">
                    <div className={cn("flex items-center gap-2", isRTL && "flex-row-reverse")}>
                      <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                      <h3 className="text-xl font-bold">
                        {isRTL ? 'اقتراح مفاجئ' : 'The Wildcard Suggestion'}
                      </h3>
                    </div>
                    <WildcardCard
                      major={wildcardMajor}
                      language={language as Locale}
                      majorName={MAJOR_NAMES[wildcardMajor.slug] || { en: wildcardMajor.slug, ar: wildcardMajor.slug }}
                    />
                  </div>
                )}

                {/* Recommended Programs */}
                {recommendedPrograms.length > 0 && (
                  <div className="space-y-4">
                    <h3 className={cn("text-lg font-bold flex items-center gap-2", isRTL && "flex-row-reverse")}>
                      <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-teal-500 rounded-full"></div>
                      {isRTL ? 'البرامج المتاحة في تركيا' : 'Available Programs in Turkey'}
                    </h3>
                    <div className="grid gap-3">
                      {recommendedPrograms.map((p, i) => (
                        <div key={i} className="p-4 bg-card border border-border rounded-xl hover:shadow-lg hover:border-primary/50 transition-all duration-300 group">
                          <div className={cn("flex items-start gap-3", isRTL && "flex-row-reverse")}>
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-white font-bold text-sm shrink-0 group-hover:scale-110 transition-transform">
                              {i + 1}
                            </div>
                            <p className="text-foreground font-medium group-hover:text-primary transition-colors">{p.title}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  {t('results.noResults', isRTL ? 'لم نتمكن من تحديد توصية بناءً على إجاباتك. يرجى المحاولة مرة أخرى.' : 'We could not determine a recommendation based on your answers. Please try again.')}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-3 pt-6 border-t">
              <Button
                className="flex-1 btn-primary-glow text-white py-6 text-base font-semibold"
                onClick={() => { logCtaEvent('whatsapp_click'); window.open("https://wa.me/905380130948", "_blank"); }}
                disabled={isProcessing}
              >
                {t('results.contactButton', isRTL ? 'تواصل معنا على واتساب' : 'Contact Us on WhatsApp')}
              </Button>
              <Button
                className="flex-1 py-6 text-base font-semibold hover:bg-primary/10 hover:text-primary hover:border-primary transition-all"
                variant="outline"
                onClick={handleShare}
                disabled={isProcessing || !hasResults}
              >
                {t('results.shareButton', isRTL ? 'مشاركة النتائج' : 'Share Results')}
              </Button>
              <Button
                className="flex-1 py-6 text-base font-semibold hover:bg-secondary/10 hover:text-secondary hover:border-secondary transition-all"
                variant="outline"
                onClick={resetTool}
                disabled={isProcessing}
              >
                {t('results.resetButton', isRTL ? 'إعادة الاختبار' : 'Take Again')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Quiz Questions Display
  const currentUiQuestion = uiQuestions[currentStep];
  const isRTL = language === 'ar';

  return (
    <div ref={componentRef} className="w-full max-w-3xl mx-auto p-4 md:p-6 animate-fade-in" dir={isRTL ? 'rtl' : 'ltr'}>
      {currentUiQuestion && (
        <Card className="quiz-card shadow-xl">
          <CardHeader>
            <div className="mb-4">
              <div className={cn("flex justify-between items-center mb-2 text-sm text-muted-foreground", isRTL && "flex-row-reverse")}>
                <span className="font-medium">
                  {t('quiz.questionProgress', isRTL ? `السؤال ${currentStep + 1} من ${uiQuestions.length}` : `Question ${currentStep + 1} of ${uiQuestions.length}`, { current: currentStep + 1, total: uiQuestions.length })}
                </span>
                <span className="font-bold text-primary">{Math.round(((currentStep + 1) / uiQuestions.length) * 100)}%</span>
              </div>
              <div
                className="w-full bg-muted rounded-full h-2 overflow-hidden"
                style={{ direction: isRTL ? 'rtl' : 'ltr' }}
              >
                <div
                  className={cn(
                    "h-2 rounded-full transition-all duration-500 ease-out",
                    isRTL ? "bg-gradient-to-l from-primary to-secondary" : "bg-gradient-to-r from-primary to-secondary"
                  )}
                  style={{ width: `${((currentStep + 1) / uiQuestions.length) * 100}%` }}
                />
              </div>
            </div>
            <CardTitle className={cn("text-xl md:text-2xl", isRTL && "text-right")}>{currentUiQuestion.prompt}</CardTitle>
          </CardHeader>

          <CardContent id={`question-${currentUiQuestion.id}`} className="space-y-4">
            {/* Single Choice Questions */}
            {currentUiQuestion.type === 'single' && currentUiQuestion.options && (
              <RadioGroup
                value={rawAnswers[currentUiQuestion.id] as string || ""}
                onValueChange={val => handleAnswerChange(currentUiQuestion.id, val)}
                className="space-y-2"
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                {currentUiQuestion.options.map(opt => (
                  <Label
                    key={opt.id}
                    htmlFor={`${currentUiQuestion.id}-${opt.id}`}
                    className={cn(
                      "flex items-center p-3 border rounded-md hover:border-blue-500 cursor-pointer has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50 transition-all gap-3",
                      isRTL && "flex-row-reverse"
                    )}
                  >
                    <RadioGroupItem value={opt.id} id={`${currentUiQuestion.id}-${opt.id}`} className="shrink-0" />
                    <span className="flex-1">{opt.label}</span>
                  </Label>
                ))}
              </RadioGroup>
            )}

            {/* Rank/Multiple Choice Questions */}
            {currentUiQuestion.type === 'rank' && currentUiQuestion.options && (
              <div className="space-y-2" dir={isRTL ? 'rtl' : 'ltr'}>
                <p className={cn("text-sm text-muted-foreground mb-2", isRTL && "text-right")}>
                  {t('quiz.select3Rank', isRTL ? 'اختر 3 بالضبط ثم اضغط التالي' : 'Select exactly 3 and click Next')}
                </p>
                {currentUiQuestion.options.map(opt => (
                  <Label
                    key={opt.id}
                    htmlFor={`${currentUiQuestion.id}-${opt.id}`}
                    className={cn(
                      "flex items-center p-3 border rounded-md hover:border-blue-500 cursor-pointer has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50 transition-all gap-3",
                      isRTL && "flex-row-reverse"
                    )}
                  >
                    <Checkbox
                      id={`${currentUiQuestion.id}-${opt.id}`}
                      checked={(rawAnswers[currentUiQuestion.id] as string[] || []).includes(opt.id)}
                      onCheckedChange={c => handleCheckboxChange(currentUiQuestion.id, opt.id, !!c, currentUiQuestion.maxSelections)}
                      className="shrink-0"
                    />
                    <span className="flex-1">{opt.label}</span>
                  </Label>
                ))}
              </div>
            )}

            {/* Scale Questions */}
            {currentUiQuestion.type === 'scale' && (
              <div className="py-4">
                <div className={cn("flex justify-between mb-2", isRTL && "flex-row-reverse")}>
                  <span>{isRTL ? currentUiQuestion.max : currentUiQuestion.min}</span>
                  <span className="text-lg font-semibold text-blue-600">
                    {rawAnswers[currentUiQuestion.id] !== undefined ? rawAnswers[currentUiQuestion.id] : currentUiQuestion.defaultValue}
                  </span>
                  <span>{isRTL ? currentUiQuestion.min : currentUiQuestion.max}</span>
                </div>
                <Slider
                  id={currentUiQuestion.id}
                  min={currentUiQuestion.min ?? 0}
                  max={currentUiQuestion.max ?? 4}
                  step={currentUiQuestion.step ?? 1}
                  defaultValue={[currentUiQuestion.defaultValue ?? 2]}
                  value={rawAnswers[currentUiQuestion.id] !== undefined ? [rawAnswers[currentUiQuestion.id] as number] : [currentUiQuestion.defaultValue ?? 2]}
                  dir={isRTL ? 'rtl' : 'ltr'}
                  onValueChange={valueArray => handleAnswerChange(currentUiQuestion.id, valueArray[0])}
                  className="w-full"
                />
              </div>
            )}

            {/* Navigation Buttons */}
            <div className={cn("flex justify-between mt-6 gap-3", isRTL && "flex-row-reverse")}>
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
                className="px-6 py-5 font-semibold hover:bg-muted"
              >
                {t('quiz.previousButton', isRTL ? 'السابق' : 'Back')}
              </Button>
              <Button
                onClick={handleNext}
                disabled={rawAnswers[currentUiQuestion.id] === undefined || (Array.isArray(rawAnswers[currentUiQuestion.id]) && (rawAnswers[currentUiQuestion.id] as string[]).length === 0)}
                className="btn-primary-glow px-6 py-5 font-semibold text-white"
              >
                {currentStep < uiQuestions.length - 1 ? t('quiz.nextButton', isRTL ? 'التالي' : 'Next') : t('quiz.showResultsButton', isRTL ? 'عرض النتائج' : 'Show Results')}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default QuizContent;
