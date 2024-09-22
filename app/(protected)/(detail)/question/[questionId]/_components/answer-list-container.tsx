/* eslint-disable no-underscore-dangle */
import { getQuestionById } from '@/app/data/question';
import { getSessionUserData } from '@/app/data/user';
import AnswerList from './answer-list';

export default async function AnswerListContainer({ questionId }: { questionId: string }) {
  const questionDetail = await getQuestionById({ questionId, answerTake: 10 });
  const { id } = await getSessionUserData();
  if (!questionDetail) return <div>없음</div>;

  return (
    <AnswerList
      answers={questionDetail.answers}
      totalCount={questionDetail._count.answers}
      userId={id}
      answerCursorId={questionDetail.answerCursorId}
      questionId={questionDetail.id}
    />
  );
}
