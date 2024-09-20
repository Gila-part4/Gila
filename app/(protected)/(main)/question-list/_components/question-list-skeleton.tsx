import QuestionCardSkeleton from '@/components/skeletons/question-card-skeleton';
import Skeleton from '@/components/ui/skeleton';

export default function QuestionListSkeleton() {
  return (
    <>
      <div className="flex items-center justify-between w-full">
        <h1 className="text-xl font-semibold">질문 목록</h1>
        <Skeleton className="w-[80px] h-[30px] bg-gray-200" />
      </div>
      <div className="pt-3 w-full">
        <QuestionCardSkeleton />
        <QuestionCardSkeleton />
        <QuestionCardSkeleton />
        <QuestionCardSkeleton />
      </div>
    </>
  );
}
