/* eslint-disable no-underscore-dangle */
import { getQuestionById } from '@/app/data/question';
import { auth } from '@/auth';
import AnswerList from './answer-list';

export default async function AnswerListContainer({ questionId }: { questionId: string }) {
  const questionDetail = await getQuestionById({ questionId, answerTake: 10 });
  const user = await auth();
  if (!questionDetail) return <div>없음</div>;

  return (
    <AnswerList
      answers={questionDetail.answers}
      totalCount={questionDetail._count.answers}
      userId={user?.user?.id}
      answerCursorId={questionDetail.answerCursorId}
      questionId={questionDetail.id}
    />
  );
}
