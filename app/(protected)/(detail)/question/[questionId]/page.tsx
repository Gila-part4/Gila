/* eslint-disable no-underscore-dangle */
import { getQuestionById } from '@/app/data/question';
import { Separator } from '@/components/ui/separator';
import { Suspense } from 'react';
import QuestionDetail from './_components/question-detail';
import AnswerForm from './_components/answer-form';
import QuestionDetailSkeleton from './_components/question-detail-skeleton';
import AnswerListContainer from './_components/answer-list-container';
import AnswerListSkeleton from './_components/answer-list-skeleton';
import { getSessionUserData } from '@/app/data/user';
import LoginLinkArea from '@/components/loginLink-area';

interface Params {
  questionId: string;
}

export default async function Page({ params }: { params: Params }) {
  const questionDetail = await getQuestionById({ questionId: params.questionId, answerTake: 10 });
  const session = await getSessionUserData();
  if (!questionDetail) return <div>없음</div>;
  return (
    <div className="p-4 flex flex-col gap-4">
      <Suspense fallback={<QuestionDetailSkeleton />}>
        <QuestionDetail questionId={params.questionId} />
      </Suspense>
      <Suspense fallback={<AnswerListSkeleton />}>
        <AnswerListContainer questionId={params.questionId} />
      </Suspense>
      <Separator className="bg-gray_300" />
      <div className="relative">
        {!session && <LoginLinkArea />}
        <AnswerForm />
      </div>
    </div>
  );
}
