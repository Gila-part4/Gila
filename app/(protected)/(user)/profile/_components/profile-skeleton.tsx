import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Skeleton from '@/components/ui/skeleton';

export default function ProfileSkeleton() {
  return (
    <Card className="shadow-md">
      <CardHeader className="flex flex-col gap-5 items-center">
        <CardTitle className="font-bold text-center">
          <Skeleton className="w-[200px] h-[40px] bg-gray-200" />
        </CardTitle>
        <Skeleton className="w-40 h-40 rounded-full bg-gray-200" />
      </CardHeader>
      <CardContent>
        <Skeleton className="w-full h-[384px] bg-gray-200" />
      </CardContent>
    </Card>
  );
}
