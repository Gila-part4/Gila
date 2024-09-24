/* eslint-disable no-underscore-dangle */

'use client';

import toggleFavorite from '@/app/action/favorite';
import { TAGS } from '@/constants/tag';
import { Heart, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { increaseActivityCount } from '@/app/action/activity';
import SharePopover from '@/app/(protected)/(detail)/activity/[activityId]/_components/share-popover';
import formatDateRange from '@/utils/formatDateRange';
import { ActivityWithUserAndFavorite } from '@/type';
import toastLoginMessage from '@/utils/toastLoginMessage';

export default function DetailTitle({
  activityDetail,
  session,
}: {
  activityDetail: ActivityWithUserAndFavorite;
  session?: string;
}) {
  const [favorite, setFavorite] = useState(activityDetail.isFavorite);
  const [viewCount, setViewCount] = useState(activityDetail.views);
  const [likeCount, setLikeCount] = useState(activityDetail._count.favorites);
  const getTagColor = (item: string) => {
    const tagInfo = TAGS.find((tagItem) => tagItem.tag.includes(item));
    return tagInfo ? tagInfo.color : '#FFB800';
  };
  const formatDate = formatDateRange({
    startDateString: activityDetail.startDate,
    endDateString: activityDetail.endDate,
  });

  const toggleActivityLike = async () => {
    setFavorite(!favorite);
    if (favorite) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    const result = await toggleFavorite(activityDetail.id);
    toast.message(result.message);
  };

  useEffect(() => {
    const action = async () => {
      const result = await increaseActivityCount(activityDetail.id);
      if (result.success) {
        setViewCount(viewCount + 1);
      }
    };
    action();
  }, [activityDetail.id, viewCount]);

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex gap-1">
          {activityDetail.tags.map((item: string) => (
            <span
              key={item}
              className="py-1 px-2 text-[9px] font-bold text-black rounded-3xl"
              style={{ backgroundColor: getTagColor(item) }}
            >
              {item}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <div
            onClick={session ? toggleActivityLike : toastLoginMessage}
            className="cursor-pointer"
          >
            {favorite ? <Heart size={20} color="#FF4242" fill="#FF4242" /> : <Heart size={20} />}
          </div>
          <SharePopover activityId={activityDetail.id} shareImage={activityDetail.thumbnails[0]} />
        </div>
      </div>
      <h1 className="mt-1 text-2xl font-bold leading-normal">{activityDetail.title}</h1>
      <div className="flex items-center gap-3 my-2">
        <div className="flex gap-4">
          <div className="flex items-center gap-1">
            <Heart size={20} />
            <p className="ml-1 text-xs font-normal leading-relaxed">{likeCount}</p>
          </div>
          <div className="flex items-center gap-1">
            <Eye width={20} />
            <p className="text-xs">{viewCount}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center mx-0">
        <p className="text-xs">
          <span className="text-[#949694] mr-1">기간</span> {formatDate}
        </p>
      </div>
    </div>
  );
}
