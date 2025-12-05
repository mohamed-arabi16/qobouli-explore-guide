import React, { useState, Suspense, lazy } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useLanguage } from '@/contexts/LanguageContext';
import UserInfoForm from './UserInfoForm';
import QuizSkeleton from './QuizSkeleton';

const QuizContent = lazy(() => import('./QuizContent'));

interface AIMajorRecommenderProps {
  id?: string;
}

const AIMajorRecommender: React.FC<AIMajorRecommenderProps> = ({ id }) => {
  const { t } = useLanguage();
  const [userName, setUserName] = useState<string>('');
  const [userPhone, setUserPhone] = useState<string>('');
  const [showUserForm, setShowUserForm] = useState<boolean>(true);
  const [isSubmittingUserInfo, setIsSubmittingUserInfo] = useState(false);
  const [quizKey, setQuizKey] = useState(0); // Used to reset the quiz

  const handleUserFormSubmit = (name: string, phone: string) => {
    setIsSubmittingUserInfo(true);
    setUserName(name);
    setUserPhone(phone);
    // Persist user info in case of refresh
    sessionStorage.setItem('userInfo', JSON.stringify({ name, phone }));
    setTimeout(() => {
      setShowUserForm(false);
      setIsSubmittingUserInfo(false);
    }, 300);
  };

  const resetTool = () => {
    setShowUserForm(true);
    setUserName('');
    setUserPhone('');
    sessionStorage.removeItem('quizAnswers');
    sessionStorage.removeItem('quizCompleted');
    sessionStorage.removeItem('userInfo');
    const url = new URL(window.location.href);
    url.searchParams.delete('session');
    window.history.pushState({}, '', url.toString());
    setQuizKey(prevKey => prevKey + 1); // Change key to force remount of QuizContent
  };

  // On mount, check if user info is in session storage
  useState(() => {
    try {
        const savedInfo = sessionStorage.getItem('userInfo');
        if (savedInfo) {
            const { name, phone } = JSON.parse(savedInfo);
            setUserName(name);
            setUserPhone(phone);
            setShowUserForm(false);
        }
        const savedAnswers = sessionStorage.getItem('quizAnswers');
        if (savedAnswers && Object.keys(JSON.parse(savedAnswers)).length > 0) {
            setShowUserForm(false);
        }

    } catch (error) {
        console.error("Failed to parse user info from sessionStorage", error);
    }
  });


  if (showUserForm) {
    return (
        <div id={id} className="w-full max-w-xl mx-auto p-4 md:p-6 animate-fade-in">
            <Card className="quiz-card shadow-2xl">
                <CardHeader className="space-y-3">
                    <CardTitle className="text-2xl md:text-3xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {t('userForm.title', 'Start Your Educational Journey')}
                    </CardTitle>
                    <CardDescription className="text-base">{t('userForm.subtitle', 'Share some information...')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <UserInfoForm onSubmit={handleUserFormSubmit} isSubmitting={isSubmittingUserInfo} />
                </CardContent>
            </Card>
        </div>
    );
  }

  return (
    <div id={id} className="w-full max-w-3xl mx-auto p-4 md:p-6 animate-fade-in">
      <Suspense fallback={<QuizSkeleton />}>
        <QuizContent key={quizKey} userName={userName} userPhone={userPhone} onReset={resetTool} />
      </Suspense>
    </div>
  );
};

export default AIMajorRecommender;
