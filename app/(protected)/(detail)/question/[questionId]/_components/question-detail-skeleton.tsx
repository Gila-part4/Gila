import { Separator } from '@/components/ui/separator';
import Skeleton from '@/components/ui/skeleton';

export default function QuestionDetailSkeleton() {
  return (
    <div className="flex flex-col gap-7">
      <Skeleton className="w-[200px] h-[30px] bg-gray-200" />
      <div className="flex flex-col gap-5">
        <div className="flex justify-between">
          <div className="flex gap-3">
            <Skeleton className="w-[100px] h-[20px] bg-gray-200" />
            <Skeleton className="w-[50px] h-[20px] bg-gray-200" />
          </div>
          <div>
            <Skeleton className="w-[100px] h-[20px] bg-gray-200" />
          </div>
        </div>
        <Separator className="bg-gray_300" />
      </div>
      <Skeleton className="w-full h-[35px] bg-gray-200" />
    </div>
  );
}
