'use client';

import { useCallback, useEffect, useState, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ActivityListCard from '@/app/(protected)/(main)/activity-list/_components/activity-list-card';
import { getActivities } from '@/app/data/activity';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { ActivityWithUserAndFavoCount, Sort } from '@/type';
import ActivityCardSkeleton from '@/components/skeletons/activity-card-skeleton';
import ActivityCarousel from './activity-carousel';

interface Props {
  activities: ActivityWithUserAndFavoCount[];
  cursorId: string | null;
  sort: Sort;
}

export default function ActivityList({ activities, cursorId, sort }: Props) {
  const [infinityActivities, setInfinityActivities] = useState<ActivityWithUserAndFavoCount[]>([]);
  const [infinityCursorId, setInfinityCursorId] = useState<string | null>(cursorId);
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [userLocation, setUserLocation] = useState('');

  const loadMoreActivities = useCallback(async () => {
    startTransition(async () => {
      if (!infinityCursorId) return;
      const result = await getActivities({
        type: sort,
        cursor: infinityCursorId,
        size: 5,
      });
      setInfinityCursorId(result.cursorId);
      setInfinityActivities((prev) => [...prev, ...result.activities]);
    });
  }, [infinityCursorId, sort]);

  const observer = useInfiniteScroll({
    callback: loadMoreActivities,
    isLoading: isPending,
    cursorId: infinityCursorId,
  });

  useEffect(() => {
    setInfinityActivities([...activities]);
    setInfinityCursorId(cursorId);
    const location = localStorage.getItem('location');
    if (location) {
      setUserLocation(location);
    }
  }, [activities, cursorId, sort]);

  if (activities.length === 0 && searchParams.get('sort') === 'tag') {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <span>관심사를 먼저 설정해 주세요!</span>
        <Link
          href="/topic"
          className="flex items-center justify-center px-4 py-3 font-semibold rounded-lg bg-primary text-white_light hover:bg-primary_dark"
        >
          관심사 정하기
        </Link>
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="flex items-center justify-center">현재 활동중인 길라가 아무도 없습니다.</div>
    );
  }

  return (
    <>
      <ul className="flex flex-col w-full gap-6">
        {infinityActivities.map((activity, index) => (
          <li key={activity.id}>
            <ActivityListCard activity={activity} />
            {index === 4 && userLocation && <ActivityCarousel userLocation={userLocation} />}
          </li>
        ))}
        <div ref={observer} />
      </ul>
      {isPending && <ActivityCardSkeleton />}
    </>
  );
}
