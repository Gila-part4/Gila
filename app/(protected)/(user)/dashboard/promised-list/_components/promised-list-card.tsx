'use client';

import { approveActivityRequest, rejectActivityRequest } from '@/app/action/activity-request';
import SmallButton from '@/components/small-button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import UserIcon from '@/components/user-icon';
import { RequestWithReqUserAndActivity } from '@/type';
import formatDateRange from '@/utils/formatDateRange';
import Image from 'next/image';
import { MouseEventHandler, useTransition } from 'react';
import { toast } from 'sonner';

interface Props {
  promisedActivity: RequestWithReqUserAndActivity;
}

export default function PromisedListCard({ promisedActivity }: Props) {
  const [isPending, startTransition] = useTransition();
  const { id, activity, requestUser } = promisedActivity;
  const { title, startDate, endDate, thumbnails } = activity;

  const approve: MouseEventHandler = (e) => {
    e.preventDefault();
    startTransition(async () => {
      const action = await approveActivityRequest(id);
      if (!action.success) {
        toast.error(action.message);
        return;
      }
      toast.success(action.message);
    });
  };

  const reject: MouseEventHandler = (e) => {
    e.preventDefault();
    startTransition(async () => {
      const action = await rejectActivityRequest(id);
      if (!action.success) {
        toast.error(action.message);
        return;
      }
      toast.success(action.message);
    });
  };

  return (
    <Card className="flex items-center gap-2 justify-between w-full h-[130px] p-2 text-base">
      <CardHeader className="w-full h-full p-0">
        <div className="relative w-[120px] h-full">
          <Image
            src={thumbnails[0] || '/default-profile-image.png'}
            alt="thumbnail"
            fill
            sizes="(max-width: 768px) 100vw"
            style={{ objectFit: 'cover', borderRadius: '8px' }}
          />
        </div>
      </CardHeader>
      <CardContent className="w-full p-0">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold">{title}</span>
          <UserIcon
            imageSrc={requestUser.image || '/default-profile-image.png'}
            name={requestUser.nickname}
          />
          <p className="text-sm font-medium text-gray-500">
            {formatDateRange({ startDateString: startDate, endDateString: endDate })}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-end w-[60%] gap-1 p-0 pr-1">
        <SmallButton disabled={isPending} onClick={approve} color="bg-green" name="수락" />
        <SmallButton disabled={isPending} onClick={reject} color="bg-red" name="거절" />
      </CardFooter>
    </Card>
  );
}
