/* eslint-disable no-underscore-dangle */
import { Separator } from '@/components/ui/separator';
import { Suspense } from 'react';
import QuestionDetail from './_components/question-detail';
import AnswerForm from './_components/answer-form';
import QuestionDetailSkeleton from './_components/question-detail-skeleton';
import AnswerListContainer from './_components/answer-list-container';
import AnswerListSkeleton from './_components/answer-list-skeleton';

interface Params {
  questionId: string;
}

export default async function Page({ params }: { params: Params }) {
  return (
    <div className="p-4 flex flex-col gap-4">
      <Suspense fallback={<QuestionDetailSkeleton />}>
        <QuestionDetail questionId={params.questionId} />
      </Suspense>
      <Suspense fallback={<AnswerListSkeleton />}>
        <AnswerListContainer questionId={params.questionId} />
      </Suspense>
      <Separator className="bg-gray_300" />
      <AnswerForm />
    </div>
  );
}
