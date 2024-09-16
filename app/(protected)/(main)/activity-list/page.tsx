import { Sort } from '@/type';
import MainCarousel from '@/app/(protected)/(main)/_components/main-carousel';
import ActivityContainer from '@/app/(protected)/(main)/activity-list/_components/activity-container';
import Link from 'next/link';
import PlusDiv from '@/components/common/plus-div';
import { Suspense } from 'react';
import CarouselCardSkeleton from '@/components/skeletons/carousel-card-skeleton';
import ActivityListSkeleton from './_components/activity-list-skeleton';

export default async function Page({
  searchParams: { sort, location },
}: {
  searchParams: { sort: Sort; location: string };
}) {
  return (
    <main className="relative">
      <div className="relative pb-8 bg-white shadow-inner border-y-2 z-20">
        <h1 className="px-4 pt-4 text-xl font-semibold">현재 주목받는 길라들</h1>
        <Suspense fallback={<CarouselCardSkeleton />}>
          <MainCarousel />
        </Suspense>
      </div>
      <Suspense fallback={<ActivityListSkeleton />}>
        <ActivityContainer sort={sort} location={location} />
      </Suspense>
      <div className="fixed w-8 bottom-24 right-[20px] z-50 tall:right-[calc(50vw-380px)]">
        <Link href="/dashboard/my-activity/create">
          <PlusDiv />
        </Link>
      </div>
    </main>
  );
}
