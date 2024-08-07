import { Suspense } from 'react';
import Link from 'next/link';
import { getMyActivities } from '@/app/data/activity';
import { getCurrentUser } from '@/app/data/user';
import MyActivityList from '@/app/(protected)/(user)/dashboard/my-activity/_components/my-activity-list';
import Loading from '@/app/(protected)/(user)/dashboard/loading';
import PlusDiv from '@/components/common/plus-div';

export default async function Page() {
  const { activities, cursorId } = await getMyActivities({ take: 7 });
  const user = await getCurrentUser();

  return (
    <main className="p-5 pb-20">
      <div className="flex items-center justify-between w-full pb-5">
        <div>
          <h1 className="text-2xl font-bold">
            <span className="text-3xl text-primary">{user.nickname}</span>님의 길라 활동
          </h1>
          <p className="text-base font-medium">
            여기서 {user.nickname}님만의 길라 활동을 관리하세요!
          </p>
        </div>
        <div>
          <Link href="/dashboard/my-activity/create" className="relative z-50">
            <PlusDiv />
          </Link>
        </div>
      </div>
      <Suspense fallback={<Loading />}>
        <MyActivityList myActivities={activities} activityCursorId={cursorId} />
      </Suspense>
    </main>
  );
}
