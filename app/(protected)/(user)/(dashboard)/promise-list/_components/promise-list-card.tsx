'use client';

import ImageCard from '@/components/image-card';
import SmallButton from '@/components/small-button';
import PromiseStatus from '@/app/(protected)/(user)/(dashboard)/promise-list/_components/promise-status';
import { RequestWithActivity } from '@/type';
import { format } from 'date-fns';
import { deleteActivityRequest } from '@/app/action/activity-request';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function PromiseListCard({ promise }: { promise: RequestWithActivity }) {
  const router = useRouter();
  const { activity } = promise;
  const start = format(activity.startDate, 'yyyy.MM.dd');
  const end = format(activity.endDate, 'yyyy.MM.dd');

  const cancelPromise = async () => {
    const result = await deleteActivityRequest(promise.id);
    toast.message(result.message);
    router.refresh();
  };

  return (
    <ImageCard
      activityId={activity.id}
      title={activity.title}
      date={`${start} ~ ${end}`}
      participants={activity.maximumCount}
      bottomContent={
        <div className="absolute right-3 bottom-3 z-10">
          {promise.status === 'PENDING' && (
            <SmallButton
              color="bg-primary"
              name="취소"
              onClick={(e) => {
                e.preventDefault();
                cancelPromise();
              }}
            />
          )}
        </div>
      }
      topContent={
        <div className="absolute top-1 right-1">
          <PromiseStatus status={promise.status} />
        </div>
      }
    />
  );
}
