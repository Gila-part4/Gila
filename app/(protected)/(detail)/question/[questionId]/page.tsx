/* eslint-disable no-underscore-dangle */
import { getQuestionById } from '@/app/data/question';
import { getCurrentUser } from '@/app/data/user';
import { Separator } from '@/components/ui/separator';
import { Suspense } from 'react';
import QuestionDetail from './_components/question-detail';
import AnswerList from './_components/answer-list';
import AnswerForm from './_components/answer-form';
import QuestionDetailSkeleton from './_components/question-detail-skeleton';

interface Params {
  questionId: string;
}

export default async function Page({ params }: { params: Params }) {
  const questionDetail = await getQuestionById({ questionId: params.questionId, answerTake: 10 });
  const currentUser = await getCurrentUser();
  if (!questionDetail) return <div>없음</div>;
  return (
    <div className="p-4 flex flex-col gap-4">
      <Suspense fallback={<QuestionDetailSkeleton />}>
        <QuestionDetail questionId={params.questionId} />
      </Suspense>
      <AnswerList
        answers={questionDetail.answers}
        totalCount={questionDetail._count.answers}
        userId={currentUser.id}
        answerCursorId={questionDetail.answerCursorId}
        questionId={questionDetail.id}
      />
      <Separator className="bg-gray_300" />
      <AnswerForm />
    </div>
  );
}
