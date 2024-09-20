import { getQuestionById } from '@/app/data/question';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import calculateDate from '@/utils/calculateData';

export default async function QuestionDetail({ questionId }: { questionId: string }) {
  const questionDetail = await getQuestionById({ questionId, answerTake: 10 });
  if (!questionDetail) return <div>없음</div>;
  const createaAt = calculateDate(questionDetail.createdAt);

  return (
    <div className="flex flex-col h-fit gap-3">
      <p className="text-left text-3xl font-bold leading-tight break-word pb-2">
        {questionDetail.title}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold">{questionDetail.location}</p>
          <p className="text-[12px] text-nowrap w-10 text-center text-gray_500">{`${createaAt.time}${createaAt.result}전`}</p>
        </div>
        <div className="flex justify-center items-center gap-2">
          <Avatar className="w-7 h-7">
            <AvatarImage
              src={questionDetail.user.image || '/default-profile-image.png'}
              className="object-cover w-7 h-7 rounded-full"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="text-sm">{questionDetail.user.nickname}</p>
        </div>
      </div>
      <Separator className="bg-gray_300 my-2" />
      <div className="text-left break-words min-h-10">{questionDetail.content}</div>
    </div>
  );
}
