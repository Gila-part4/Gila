import AnswerCardSkeleton from '@/components/skeletons/answer-card-skeleton';
import Skeleton from '@/components/ui/skeleton';

export default function AnswerListSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <Skeleton className="w-[80px] h-[25px] bg-gray-200" />
        <Skeleton className="w-[50px] h-[25px] bg-gray-200" />
      </div>
      <div className="flex flex-col gap-2">
        <AnswerCardSkeleton />
        <AnswerCardSkeleton />
      </div>
    </div>
  );
}
