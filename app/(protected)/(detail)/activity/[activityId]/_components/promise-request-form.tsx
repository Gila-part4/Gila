'use client';

import { createActivityRequest } from '@/app/action/activity-request';
import { requestMail } from '@/app/action/mail';
import { Button } from '@/components/ui/button';
import { ActivityWithRequest } from '@/type';
import formatDateRange from '@/utils/formatDateRange';
import { useEffect, useState, useTransition } from 'react';
import { toast } from 'sonner';

export default function PromiseRequestForm({
  activity,
  currentUser,
}: {
  activity: ActivityWithRequest;
  currentUser: string;
}) {
  const { startDate, endDate, id, maximumCount, activityRequests } = activity;
  const [isPending, startTransition] = useTransition();
  const [isDisabled, setIsDisabled] = useState(!!activityRequests[0]);
  const [buttonStatus, setButtonStatus] = useState('');
  const formatDate = formatDateRange({ startDateString: startDate, endDateString: endDate });
  const nowDate = new Date();
  const deactivateActivity = endDate > nowDate;

  const applyActivity = () => {
    startTransition(async () => {
      const result = await createActivityRequest(id);
      toast.message(result.message);
      setIsDisabled(true);
      if (result.success) {
        const request = await requestMail(activity);
        toast.message(request.message);
      }
    });
  };
  
  // 이 부분은 form으로 개선이 필요해 보여서 버튼 적용은 추후에 진행해야 할 듯 합니다.
  useEffect(() => {
    if (!activityRequests[0]) {
      setButtonStatus('약속잡기');
    } else {
      switch (activityRequests[0].status) {
        case 'APPROVE':
          setButtonStatus('수락됨');
          break;
        case 'PENDING':
          setButtonStatus('대기중');
          break;
        case 'REJECT':
          setButtonStatus('거절됨');
          break;
        default:
          setButtonStatus('약속잡기');
      }
    }
  }, [activityRequests]);

  return (
    <div className="tall:sticky fixed inset-x-0 bottom-0 w-full tall:max-w-[420px] h-20 bg-[#1B1B1B] z-50 flex justify-between gap-8 items-center px-8 py-0">
      {deactivateActivity ? (
        <>
          <div className="flex flex-col items-center justify-between w-full gap-2">
            <p className="text-sm text-white">최대 인원 {maximumCount}명</p>
            <p className="text-xs text-white">{formatDate}</p>
          </div>
          {activity.userId !== currentUser && (
            <Button
              type="button"
              className="px-4 py-2 text-sm font-semibold text-white border border-none rounded-md bg-primary hover:bg-primary_dark"
              onClick={applyActivity}
              disabled={isPending || isDisabled}
            >
              {buttonStatus}
            </Button>
          )}
        </>
      ) : (
        <div className="flex justify-center items-center w-full">
          <p className="text-white text-sm font-semibold">기간이 지난 활동은 신청할 수 없습니다.</p>
        </div>
      )}
    </div>
  );
}
