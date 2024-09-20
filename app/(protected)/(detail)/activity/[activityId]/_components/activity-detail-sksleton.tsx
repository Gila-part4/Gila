import { Card, CardContent } from '@/components/ui/card';
import Skeleton from '@/components/ui/skeleton';

export default function ActivityDetailSkeleton() {
  return (
    <div>
      <Card className="border-none rounded-none">
        <CardContent className="relative p-3 border-none">
          <Skeleton className="w-full h-[240px] bg-gray-300 border-none" />
        </CardContent>
      </Card>
      <div className="flex flex-col p-3 gap-2">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Skeleton className="w-[50px] h-[25px] bg-gray-200" />
            <Skeleton className="w-[50px] h-[25px] bg-gray-200" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="w-[30px] h-[25px] bg-gray-200" />
            <Skeleton className="w-[30px] h-[25px] bg-gray-200" />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <Skeleton className="w-[200px] h-[30px] bg-gray-200" />
          <div className="flex flex-col gap-2">
            <Skeleton className="w-[100px] h-[30px] bg-gray-200" />
            <Skeleton className="w-[250px] h-[30px] bg-gray-200" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="w-[80px] h-[30px] bg-gray-200" />
            <Skeleton className="w-[200px] h-[30px] bg-gray-200" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="w-[80px] h-[30px] bg-gray-200" />
          <Skeleton className="w-full h-[240px] bg-gray-300 border-none" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="w-[80px] h-[30px] bg-gray-200" />
          <Skeleton className="w-full h-[70px] bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
