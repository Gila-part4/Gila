/* eslint-disable no-underscore-dangle */
import { getQuestionById } from '@/app/data/question';
import { getCurrentUser } from '@/app/data/user';
import AnswerList from './answer-list';

export default async function AnswerListContainer({ questionId }: { questionId: string }) {
  const questionDetail = await getQuestionById({ questionId, answerTake: 10 });
  const currentUser = await getCurrentUser();
  if (!questionDetail) return <div>없음</div>;

  return (
    <AnswerList
      answers={questionDetail.answers}
      totalCount={questionDetail._count.answers}
      userId={currentUser.id}
      answerCursorId={questionDetail.answerCursorId}
      questionId={questionDetail.id}
    />
  );
}
