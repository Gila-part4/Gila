'use client';

/* eslint-disable no-console */

import React, { useState, useTransition } from 'react';
import UserIcon from '@/components/user-icon';
import RatingSelector from '@/app/(protected)/(user)/dashboard/reviews/_components/rating-selector';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import createReview from '@/app/action/review';
import formatDateRange from '@/utils/formatDateRange';

type Props = {
  activityId: string;
  title: string;
  startDate: Date;
  endDate: Date;
  userImg: string;
  nickname: string;
  removeActivity: (activityId: string) => void;
};

export default function ReviewsCard({
  activityId,
  title,
  startDate,
  endDate,
  userImg,
  nickname,
  removeActivity,
}: Props) {
  const [selectedRating, setSelectedRating] = useState<number>(-1);
  const [isPending, startTransition] = useTransition();
  const formatDate = formatDateRange({ startDateString: startDate, endDateString: endDate });

  const handleRatingClick = (rating: number) => {
    if (selectedRating === rating) {
      setSelectedRating(-1);
    } else {
      setSelectedRating(rating);
    }
  };

  const handleSubmit = () => {
    if (selectedRating === -1) {
      toast.error('리뷰를 눌러주세요!');
      return;
    }
    startTransition(async () => {
      const action = await createReview({ activityId, rating: selectedRating });
      if (!action.success) {
        toast.error(action.message);
        return;
      }
      toast.success(action.message);
      removeActivity(activityId);
    });
  };

  return (
    <div className="relative flex w-full gap-6 p-3 border shadow-md hover:shadow-xl rounded-lg">
      <div className="flex flex-col justify-center w-full gap-2 overflow-hidden">
        <h1 className="w-full text-sm font-bold truncate">{title}</h1>
        <div className="flex flex-col gap-2 text-xs">
          <div className="flex gap-3">
            <p>{formatDate}</p>
          </div>
          <UserIcon imageSrc={userImg} name={nickname} />
        </div>
        <RatingSelector selectedRating={selectedRating} onRatingClick={handleRatingClick} />
      </div>
      <div className="absolute top-3 right-3">
        <Button disabled={isPending} onClick={handleSubmit} className="h-auto px-2 py-1 text-white">
          제출
        </Button>
      </div>
    </div>
  );
}
