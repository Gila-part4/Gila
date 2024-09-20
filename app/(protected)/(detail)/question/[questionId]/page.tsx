/* eslint-disable no-underscore-dangle */
import { getQuestionById } from '@/app/data/question';
import { Separator } from '@/components/ui/separator';
import { auth } from '@/auth';
import QuestionDetail from './_components/question-detail';
import AnswerList from './_components/answer-list';
import AnswerForm from './_components/answer-form';

interface Params {
  questionId: string;
}

export default async function Page({ params }: { params: Params }) {
  const questionDetail = await getQuestionById({ questionId: params.questionId, answerTake: 10 });
  const user = await auth();
  if (!questionDetail) return <div>없음</div>;
  return (
    <div className="p-4 flex flex-col gap-4">
      <QuestionDetail questionInfo={questionDetail} />
      <AnswerList
        answers={questionDetail.answers}
        totalCount={questionDetail._count.answers}
        userId={user?.user?.id}
        answerCursorId={questionDetail.answerCursorId}
        questionId={questionDetail.id}
      />
      <Separator className="bg-gray_300" />
      <AnswerForm questionId={questionDetail.id} />
    </div>
  );
}
