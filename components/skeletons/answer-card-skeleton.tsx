import { Card, CardContent } from '../ui/card';
import Skeleton from '../ui/skeleton';

export default function AnswerCardSkeleton() {
  return (
    <Card className="h-[100px] w-full flex border-none shadow-md hover:shadow-xl p-3 gap-6">
      <div className="flex flex-col w-full gap-3">
        <div className="flex gap-2">
          <Skeleton className="w-[150px] h-6 mb-2 bg-gray-300" />
          <Skeleton className="w-[30px] h-6 mb-2 bg-gray-300" />
        </div>
        <CardContent className="p-0">
          <div className="flex items-center justify-between">
            <Skeleton className="w-1/2 h-4 bg-gray-300" />
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
