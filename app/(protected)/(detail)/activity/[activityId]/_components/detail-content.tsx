/* eslint-disable no-underscore-dangle */
import DetailTitle from '@/app/(protected)/(detail)/activity/[activityId]/_components/detail-title';
import DetailDescription from '@/app/(protected)/(detail)/activity/[activityId]/_components/detail-description';
import DetailCarousel from '@/app/(protected)/(detail)/activity/[activityId]/_components/detail-carousel';
import AuthorInfo from '@/app/(protected)/(detail)/activity/[activityId]/_components/author-info';
import { getActivityById } from '@/app/data/activity';

export default async function DetailContent({ activityId }: { activityId: string }) {
  const activity = await getActivityById(activityId);

  return (
    <div>
      <DetailCarousel thumbnails={activity.thumbnails} />
      <div className="flex flex-col gap-6 m-4 pb-20 tall:pb-0">
        <DetailTitle activityDetail={activity} />
        <DetailDescription description={activity.description} locations={activity.location} />
        <AuthorInfo ownerId={activity.userId} />
      </div>
    </div>
  );
}
