import Skeleton from '@/components/ui/skeleton';

export default function RequestSkeleton() {
  return (
    <div className="tall:sticky fixed inset-x-0 bottom-0 w-full tall:max-w-[420px] h-20 bg-[#1B1B1B] z-50 flex justify-between gap-8 items-center px-8 py-0">
      <Skeleton className="w-full h-[40px] bg-gray-800" />
    </div>
  );
}
