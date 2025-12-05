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

// Type assertion helper for Supabase queries
const supabaseAny = supabase as any;
import { useToast } from "@/hooks/use-toast";
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import useMajorScorer, { Answer as ScorerAnswer } from '@/hooks/useMajorScorer';
import { Program as CatalogProgram, pickPrograms } from '@/lib/programCatalog';
import { buildExplanation } from '@/utils/explanationPhrases';
import { getBadgeForMajor } from '@/configs/BadgeMap';
import html2canvas from 'html2canvas';

import questionsConfigJson from '@/configs/scorer_questions.json';

// Types from scorer_questions.json for better clarity
interface ScorerQuestion {
  id: string;
  type: 'rank' | 'single' | 'scale';
  prompt_en: string;
  prompt_ar?: string;
  options?: string[] | Record<string, string>;
  options_en?: Record<string, string>;
  options_ar?: Record<string, string>;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
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

interface QuizContentProps {
  userName: string;
  userPhone: string;
  onReset: () => void;
}

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
  const [explanationPhrases, setExplanationPhrases] = useState<string[]>([]);
  const [aiExplanation, setAiExplanation] = useState<string>('');
  const [isLoadingAI, setIsLoadingAI] = useState<boolean>(false);
  const [isLoadingResults, setIsLoadingResults] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);

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
        if (q.options_en) {
          mappedOptions = Object.entries(q.options_en).map(([optId, optLabelEn]: [string, string]) => ({
            id: optId,
            label: t(`question.${q.id}.options.${optId}`, optLabelEn),
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
        prompt: t(`question.${q.id}.prompt`, q.prompt_en),
        type: q.type,
        options: mappedOptions,
        maxSelections: q.id === 'SP1' ? 3 : undefined,
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
        // If we have answers from session storage, but we are not on a session URL
        // we should probably re-calculate the result if the user had previously completed the quiz.
        // This handles the case where user completes quiz, refreshes, and expects to see results.
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
      const rawGradeValue = rawAnswers['GRADE'] as string | undefined;
      let gradeValue: number | null = null;
      if (rawGradeValue === "lt70") gradeValue = 65;
      else if (rawGradeValue === "70_85") gradeValue = 78;
      else if (rawGradeValue === "gt85") gradeValue = 90;
      const highestTuitionValue = rawAnswers['highest_tuition'] !== undefined ? Number(rawAnswers['highest_tuition']) : null;
      const topPrograms = pickPrograms(computedScorerResult.sortedMajors);
      
      // Validate top_major_slug exists in majors table before insertion
      const topMajorSlug = computedScorerResult.sortedMajors[0].slug;
      const { data: majorExists }: any = await supabaseAny.from('majors')
        .select('slug')
        .eq('slug', topMajorSlug)
        .maybeSingle();
      
      const validatedMajorSlug = majorExists ? topMajorSlug : null;
      
      const payload: any = {
        user_name: userName,
        user_phone: userPhone,
        answers: rawAnswers,
        grade_band: gradeValue,
        top_major_slug: validatedMajorSlug,
        badge_slug: validatedMajorSlug,
        highest_tuition: highestTuitionValue,
        top_programs: topPrograms.map(p => p.title)
      };
      
      const { data: newSession, error }: any = await supabaseAny.from('quiz_sessions').insert([payload]).select('id').single();
      if (error) {
        console.error('Database insertion error:', error);
        // Log the error to analytics_events
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

  useEffect(() => {
    if (completed && computedScorerResult) {
      setIsLoadingResults(true);
      const finalPrograms = pickPrograms(computedScorerResult.sortedMajors);
      setRecommendedPrograms(finalPrograms);
      const explanations = buildExplanation(computedScorerResult.boosters, language as Locale);
      setExplanationPhrases(explanations);
      
      // Generate AI-powered explanation
      setIsLoadingAI(true);
      console.log('📝 Calling AI edge function with:', { 
        userName, 
        answersCount: scorerAnswers.length, 
        programsCount: finalPrograms.length, 
        boostersCount: computedScorerResult.boosters.length 
      });
      
      // Build enriched answers with human-readable labels  and values
      const enrichedAnswers = scorerAnswers.map(ans => {
        const question = scorerQuestionsConfig.find(q => q.id === ans.questionId);
        if (!question) return { questionId: ans.questionId, questionLabel: ans.questionId, displayValue: String(ans.value) };

        const questionLabel = t(`question.${ans.questionId}.prompt`, question.prompt_en);
        let displayValue: string;

        if (Array.isArray(ans.value)) {
          const opts = (Array.isArray(question.options) ? question.options : []) as any[];
          displayValue = ans.value.map(optId => {
            const opt = opts.find(o => o.id === optId);
            return opt ? (language === 'ar' ? opt.label_ar : opt.label_en) : optId;
          }).join(', ');
        } else if (question.type === 'single') {
          const opts = (Array.isArray(question.options) ? question.options : []) as any[];
          const opt = opts.find(o => o.id === ans.value);
          displayValue = opt ? (language === 'ar' ? opt.label_ar : opt.label_en) : String(ans.value);
        } else {
          displayValue = String(ans.value);
        }

        return { questionId: ans.questionId, questionLabel, displayValue };
      });

      // Set timeout for AI generation (60 seconds for better reliability)
      const aiTimeout = setTimeout(() => {
        setIsLoadingAI(false);
        toast({ 
          title: t('errors.aiTimeout', 'AI generation timed out'), 
          description: t('errors.aiTimeoutDesc', 'Using standard recommendations instead.'),
          variant: 'default' 
        });
      }, 60000);

      supabase.functions.invoke('generate-ai-recommendation', {
        body: {
          userName,
          answers: enrichedAnswers,
          topPrograms: finalPrograms,
          boosters: computedScorerResult.boosters
        }
      }).then(({ data, error }) => {
        clearTimeout(aiTimeout);
        console.log('🤖 AI response:', { data, error });
        
        // Check if function returned error in data (even with 200 status)
        if (data?.error || data?.status === 429 || data?.status === 402) {
          console.error('❌ AI recommendation error:', data);
          
          // Handle specific error codes
          if (data?.status === 429 || data?.error?.includes('429')) {
            toast({ 
              title: t('errors.rateLimitTitle', 'Too many requests'), 
              description: t('errors.rateLimitDesc', 'Please try again in a few moments.'),
              variant: 'default' 
            });
          } else if (data?.status === 402 || data?.error?.includes('402')) {
            toast({ 
              title: t('errors.quotaExceededTitle', 'Service quota exceeded'), 
              description: t('errors.quotaExceededDesc', 'Please contact support.'),
              variant: 'default' 
            });
          } else {
            toast({ 
              title: t('errors.aiGenerationFailed', 'Could not generate AI insights'), 
              description: data?.error || t('errors.aiGenerationFailedDesc', 'Using standard recommendations instead.'),
              variant: 'default' 
            });
          }
        } else if (error) {
          console.error('❌ AI function error:', error);
          toast({ 
            title: t('errors.aiGenerationFailed', 'Could not generate AI insights'), 
            description: error.message || t('errors.aiGenerationFailedDesc', 'Using standard recommendations instead.'),
            variant: 'default' 
          });
        } else if (data?.aiExplanation) {
          console.log('✅ AI explanation received, length:', data.aiExplanation.length);
          setAiExplanation(data.aiExplanation);
        } else {
          console.warn('⚠️ No AI explanation in response');
        }
        setIsLoadingAI(false);
      }).catch(err => {
        clearTimeout(aiTimeout);
        console.error('❌ Unexpected error calling AI function:', err);
        setIsLoadingAI(false);
        toast({ 
          title: t('errors.aiGenerationFailed', 'Could not generate AI insights'), 
          description: err.message,
          variant: 'destructive' 
        });
      });
      
      setIsLoadingResults(false);
      sessionStorage.setItem('quizCompleted', 'true');
    }
  }, [completed, computedScorerResult, language, userName, scorerAnswers, toast, t]);

  useEffect(() => {
    if (completed && !sessionId && computedScorerResult) {
      submitSession();
    }
  }, [completed, sessionId, computedScorerResult, submitSession]);

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
    if (q.id === 'SP1' && q.maxSelections && (!Array.isArray(ans) || ans.length !== q.maxSelections)) {
      toast({ description: t('errors.rankSelectionDesc', `Please select exactly ${q.maxSelections} options.`,{ count: q.maxSelections }), variant: 'destructive' }); return;
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
    supabaseAny.from('analytics_events').insert({session_id: sessionId, event_type: type, event_data: meta}).then();
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
      const file = await new Promise<File|null>(resolve => canvas.toBlob(blob => blob ? resolve(new File([blob], 'recommendation.png', {type:'image/png'})) : resolve(null), 'image/png'));
      if (!file) throw new Error("Canvas to blob failed");
      const deepLink = `${window.location.origin}/?session=${sessionId}`;
      
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({ title: t('share.title', 'My Major Recommendation'), text: t('share.text', 'Check out my results!'), files: [file] });
          logCtaEvent('share_success', {method: 'webshare-files'});
        } catch (err) {
          if ((err as Error).name !== 'AbortError') {
            logCtaEvent('share_failed', {error: (err as Error).message});
          }
        }
      } else if (navigator.share) {
        try {
          await navigator.share({ title: t('share.title', 'My Major Recommendation'), text: t('share.text', 'Check out my results!'), url: deepLink });
          logCtaEvent('share_success', {method: 'webshare-url'});
        } catch (err) {
          if ((err as Error).name !== 'AbortError') {
            logCtaEvent('share_failed', {error: (err as Error).message});
          }
        }
      } else {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(file);
        a.download = 'qobouli-recommendation.png';
        a.click();
        await navigator.clipboard.writeText(deepLink);
        toast({ title: t('share.linkCopiedTitle', 'Link Copied!'), description: t('share.linkCopiedDesc', 'Image downloaded and link copied.') });
        logCtaEvent('share_success', {method: 'download-clipboard'});
      }
    } catch (err) {
      toast({ title: t('errors.shareFailed', 'Share Failed'), variant: 'destructive' });
      logCtaEvent('share_failed', {error: (err as Error).message});
    }
  };

  const resetTool = () => {
    if(sessionId) logCtaEvent('restart');
    onReset();
  };

  if (isLoadingResults && !completed) return <div className="flex justify-center items-center h-screen"><Loader2 className="h-16 w-16 animate-spin text-blue-600" /> <p className="ml-3 text-lg">{t('loading.session', 'Loading session...')}</p></div>;

  if (completed) {
    const isProcessing = isLoadingResults || isSubmittingSession;
    const hasResults = !isProcessing && computedScorerResult && computedScorerResult.sortedMajors && computedScorerResult.sortedMajors.length > 0;
    const topMajor = hasResults ? computedScorerResult.sortedMajors[0] : null;
    const badge = topMajor ? getBadgeForMajor(topMajor.slug) : null;
    const isRTL = language === 'ar';

    return (
      <div ref={componentRef} className="w-full max-w-3xl mx-auto p-4 md:p-6 animate-fade-in" dir={isRTL ? 'rtl' : 'ltr'}>
        <Card ref={resultCardRef} className="quiz-card shadow-2xl border-0 overflow-hidden">
          <CardHeader className="text-center bg-gradient-to-r from-primary/10 to-secondary/10 pb-8">
            <CardTitle className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t('results.title', 'Your Results')}
            </CardTitle>
            <CardDescription className="text-base mt-2">
              {t('results.subtitle', 'Based on your responses, here are your personalized recommendations')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            {isProcessing ? (
              <div className="flex flex-col justify-center items-center py-12">
                <Loader2 className="h-16 w-16 animate-spin text-primary mb-4" />
                <p className="text-lg text-muted-foreground">{t('results.loading', 'Loading results...')}</p>
              </div>
            ) : hasResults && topMajor && badge ? (
              <>
                <div className="mb-6 p-6 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl text-center animate-scale-in border border-primary/20">
                  <span className="text-6xl mb-3 block animate-bounce">{badge.emoji}</span>
                  <p className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {language === 'ar' ? badge.label_ar : badge.label_en}
                  </p>
                </div>

                {isLoadingAI ? (
                  <div className="flex items-center justify-center gap-3 p-6 bg-muted/30 rounded-xl">
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    <p className="text-sm text-muted-foreground">{t('results.generatingAI', 'Generating personalized insights...')}</p>
                  </div>
                ) : aiExplanation ? (
                  <div className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border border-primary/20 space-y-3 animate-fade-in">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                      <h4 className="text-lg font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        {t('results.aiInsights', 'AI-Powered Insights')}
                      </h4>
                    </div>
                    <p className="text-foreground leading-relaxed whitespace-pre-wrap">{aiExplanation}</p>
                  </div>
                ) : null}

                {recommendedPrograms.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <div className="w-1 h-6 bg-gradient-to-b from-primary to-secondary rounded-full"></div>
                      {t('results.recommendedProgramsTitle', 'Recommended Programs')}
                    </h3>
                    <div className="grid gap-3">
                      {recommendedPrograms.map((p, i) => (
                        <div key={i} className="p-4 bg-card border border-border rounded-xl hover:shadow-lg hover:border-primary/50 transition-all duration-300 group">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm shrink-0 group-hover:scale-110 transition-transform">
                              {i + 1}
                            </div>
                            <p className="text-foreground font-medium group-hover:text-primary transition-colors">{p.title}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {explanationPhrases.length > 0 && !aiExplanation && (
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold">{t('results.explanationTitle', 'Why these recommendations?')}</h4>
                    <div className="flex flex-wrap gap-2">
                      {explanationPhrases.map((p, i) => (
                        <span key={i} className="text-sm bg-primary/10 text-primary px-3 py-1.5 rounded-full border border-primary/20 hover:bg-primary/20 transition-colors">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">{t('results.noResults', 'We could not determine a recommendation based on your answers. Please try again.')}</p>
              </div>
            )}
            
            <div className="flex flex-col md:flex-row gap-3 pt-6 border-t">
              <Button 
                className="flex-1 btn-primary-glow text-white py-6 text-base font-semibold" 
                onClick={() => { logCtaEvent('whatsapp_click'); window.open("https://wa.me/905380130948", "_blank"); }} 
                disabled={isProcessing}
              >
                {t('results.contactButton', 'Contact Us on WhatsApp')}
              </Button>
              <Button 
                className="flex-1 py-6 text-base font-semibold hover:bg-primary/10 hover:text-primary hover:border-primary transition-all" 
                variant="outline" 
                onClick={handleShare} 
                disabled={isProcessing || !hasResults}
              >
                {t('results.shareButton', 'Share Results')}
              </Button>
              <Button 
                className="flex-1 py-6 text-base font-semibold hover:bg-secondary/10 hover:text-secondary hover:border-secondary transition-all" 
                variant="outline" 
                onClick={resetTool} 
                disabled={isProcessing}
              >
                {t('results.resetButton', 'Take Again')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentUiQuestion = uiQuestions[currentStep];
  const isRTL = language === 'ar';
  return (
    <div ref={componentRef} className="w-full max-w-3xl mx-auto p-4 md:p-6 animate-fade-in" dir={isRTL ? 'rtl' : 'ltr'}>
      {currentUiQuestion && (
        <Card className="quiz-card shadow-xl">
          <CardHeader>
            <div className="mb-4">
              <div className={`flex justify-between items-center mb-2 text-sm text-muted-foreground ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className="font-medium">{t('quiz.questionProgress', `Question ${currentStep + 1} of ${uiQuestions.length}`, { current: currentStep + 1, total: uiQuestions.length })}</span>
                <span className="font-bold text-primary">{Math.round(((currentStep + 1) / uiQuestions.length) * 100)}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden" dir="ltr">
                <div 
                  className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500 ease-out" 
                  style={{ 
                    width: `${((currentStep + 1) / uiQuestions.length) * 100}%`,
                    marginLeft: isRTL ? 'auto' : '0',
                    marginRight: isRTL ? '0' : 'auto'
                  }}
                />
              </div>
            </div>
            <CardTitle className="text-xl md:text-2xl">{currentUiQuestion.prompt}</CardTitle>
          </CardHeader>
          <CardContent id={`question-${currentUiQuestion.id}`} className="space-y-4">
          {currentUiQuestion.type === 'single' && currentUiQuestion.options && (
            <RadioGroup value={rawAnswers[currentUiQuestion.id] as string || ""} onValueChange={val => handleAnswerChange(currentUiQuestion.id, val)} className="space-y-2">
              {currentUiQuestion.options.map(opt => <Label key={opt.id} htmlFor={`${currentUiQuestion.id}-${opt.id}`} className={`flex items-center p-3 border rounded-md hover:border-blue-500 cursor-pointer has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50 transition-all ${isRTL ? 'flex-row-reverse' : ''}`}>
                <RadioGroupItem value={opt.id} id={`${currentUiQuestion.id}-${opt.id}`} className={isRTL ? 'ml-2' : 'mr-2'}/> {opt.label}</Label>)}
            </RadioGroup>
          )}
          {currentUiQuestion.type === 'rank' && currentUiQuestion.options && (
            <div className="space-y-2">
              <p className={`text-sm text-muted-foreground mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>{t('quiz.select3Rank', 'Select exactly 3 and click Next')}</p>
              {currentUiQuestion.options.map(opt => <Label key={opt.id} htmlFor={`${currentUiQuestion.id}-${opt.id}`} className={`flex items-center p-3 border rounded-md hover:border-blue-500 cursor-pointer has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50 transition-all ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Checkbox id={`${currentUiQuestion.id}-${opt.id}`} checked={(rawAnswers[currentUiQuestion.id] as string[] || []).includes(opt.id)} onCheckedChange={c => handleCheckboxChange(currentUiQuestion.id, opt.id, !!c, currentUiQuestion.maxSelections)} className={isRTL ? 'ml-2' : 'mr-2'}/> {opt.label}</Label>)}
            </div>
          )}
          {currentUiQuestion.type === 'scale' && (
            <div className="py-4">
              <div className={`flex justify-between mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span>{currentUiQuestion.min}</span>
                <span className="text-lg font-semibold text-blue-600">
                  {rawAnswers[currentUiQuestion.id] !== undefined ? rawAnswers[currentUiQuestion.id] : currentUiQuestion.defaultValue}
                </span>
                <span>{currentUiQuestion.max}</span>
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
          <div className={`flex justify-between mt-6 gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Button 
              variant="outline" 
              onClick={handleBack} 
              disabled={currentStep === 0}
              className="px-6 py-5 font-semibold hover:bg-muted"
            >
              {t('quiz.previousButton', 'Back')}
            </Button>
            <Button 
              onClick={handleNext} 
              disabled={rawAnswers[currentUiQuestion.id] === undefined || (Array.isArray(rawAnswers[currentUiQuestion.id]) && (rawAnswers[currentUiQuestion.id] as string[]).length === 0)}
              className="btn-primary-glow px-6 py-5 font-semibold text-white"
            >
              {currentStep < uiQuestions.length - 1 ? t('quiz.nextButton', 'Next') : t('quiz.showResultsButton', 'Show Results')}
            </Button>
          </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default QuizContent;
