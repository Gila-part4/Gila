'use client';

import ImageCard from '@/components/image-card';
import PromiseStatus from '@/app/(protected)/(user)/dashboard/promise-list/_components/promise-status';
import { RequestWithActivity } from '@/type';
import { deleteActivityRequest } from '@/app/action/activity-request';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import formatDateRange from '@/utils/formatDateRange';
import DeleteAlertModal from '@/components/delete-alert-modal';
import { Button } from '@/components/ui/button';
import { MouseEventHandler } from 'react';

export default function PromiseListCard({ promise }: { promise: RequestWithActivity }) {
  const router = useRouter();
  const { activity } = promise;
  const { id, title, startDate, endDate, maximumCount, thumbnails } = activity;
  const formatDate = formatDateRange({
    startDateString: startDate,
    endDateString: endDate,
  });

  const cancelPromise = async () => {
    const result = await deleteActivityRequest(promise.id);
    toast.message(result.message);
    router.refresh();
  };

  const enterChat: MouseEventHandler = (e) => {
    e.preventDefault();
    router.push(`/chat/${promise.activityId}`);
  };

  if (promise.status === 'PENDING')
    return (
      <ImageCard
        activityId={id}
        title={title}
        imageSrc={thumbnails[0]}
        middleContent={
          <>
            <p className="text-sm font-semibold text-gray-900">{formatDate}</p>
            <div className="text-sm font-semibold text-gray-900">
              <p>최대 인원: {maximumCount} 명</p>
            </div>
            <PromiseStatus status={promise.status} />
          </>
        }
        bottomContent={
          <div className="absolute bottom-2 right-2 flex gap-32">
            <div onClick={(e) => e.preventDefault()}>
              <DeleteAlertModal deleteAction={cancelPromise} isButton content="취소" />
            </div>
          </div>
        }
      />
    );

  if (promise.status === 'APPROVE')
    return (
      <ImageCard
        activityId={id}
        title={title}
        imageSrc={thumbnails[0]}
        middleContent={
          <>
            <p className="text-sm font-semibold text-gray-900">{formatDate}</p>
            <div className="text-sm font-semibold text-gray-900">
              <p>최대 인원: {maximumCount} 명</p>
            </div>
            <PromiseStatus status={promise.status} />
          </>
        }
        bottomContent={
          <div className="absolute bottom-2 right-2 flex gap-32">
            <Button
              type="button"
              className="w-full text-base font-medium text-white shadow"
              onClick={enterChat}
              variant="access"
            >
              입장
            </Button>
          </div>
        }
      />
    );

  return (
    <ImageCard
      activityId={id}
      title={title}
      imageSrc={thumbnails[0]}
      middleContent={
        <>
          <p className="text-sm font-semibold text-gray-900">{formatDate}</p>
          <div className="text-sm font-semibold text-gray-900">
            <p>최대 인원: {maximumCount} 명</p>
          </div>
          <PromiseStatus status={promise.status} />
        </>
      }
    />
  );
}
