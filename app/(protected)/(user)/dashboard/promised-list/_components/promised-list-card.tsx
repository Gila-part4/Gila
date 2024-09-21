'use client';

import { approveActivityRequest, rejectActivityRequest } from '@/app/action/activity-request';
import { responseMail } from '@/app/action/mail';
import DeleteAlertModal from '@/components/delete-alert-modal';
import { Button } from '@/components/ui/button';
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
      const action = await approveActivityRequest(id, activity.id);
      if (!action.success) {
        toast.error(action.message);
        return;
      }
      toast.success(action.message);
      const response = await responseMail(activity, requestUser, 'approve');
      toast.success(response.message);
    });
  };

  const reject = () => {
    startTransition(async () => {
      const action = await rejectActivityRequest(id);
      if (!action.success) {
        toast.error(action.message);
        return;
      }
      toast.success(action.message);
      const response = await responseMail(activity, requestUser, 'reject');
      toast.success(response.message);
    });
  };

  return (
    <Card className="flex items-center justify-between w-full h-[130px] p-3 gap-6 text-base border shadow-md hover:shadow-xl">
      <CardHeader className="w-full h-full p-0">
        <div className="relative w-[110px] h-full">
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
        <Button
          disabled={isPending}
          type="button"
          className="w-full text-base font-medium text-white shadow"
          onClick={approve}
          variant="access"
        >
          수락
        </Button>
        <div className="w-full" onClick={(e) => e.preventDefault()}>
          <DeleteAlertModal deleteAction={reject} isButton content="거절" />
        </div>
      </CardFooter>
    </Card>
  );
}
