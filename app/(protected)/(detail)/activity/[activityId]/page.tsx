import DetailContent from '@/app/(protected)/(detail)/activity/[activityId]/_components/detail-content';
import { Suspense } from 'react';
import RequestContainer from './_components/request-container';
import ActivityDetailSkeleton from './_components/activity-detail-sksleton';
import RequestSkeleton from './_components/request-skeleton';

interface Params {
  activityId: string;
}

export default async function Page({ params }: { params: Params }) {
  return (
    <div>
      <Suspense fallback={<ActivityDetailSkeleton />}>
        <DetailContent activityId={params.activityId} />
      </Suspense>
      <Suspense fallback={<RequestSkeleton />}>
        <RequestContainer activityId={params.activityId} />
      </Suspense>
    </div>
  );
}
