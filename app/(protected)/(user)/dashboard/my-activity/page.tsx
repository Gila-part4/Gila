import Link from 'next/link';
import PlusDiv from '@/components/common/plus-div';
import { Suspense } from 'react';
import { getSessionUserData } from '@/app/data/user';
import MyActivityContainer from './_components/my-activity-container';
import MyActivitySkeleton from './_components/my-activity-skeleton';

export default async function Page() {
  const { name } = await getSessionUserData();

  return (
    <main className="p-5">
      <div className="flex items-center justify-between w-full pb-5">
        <div>
          <h1 className="text-2xl font-bold">
            <span className="text-3xl text-primary">{name}</span>님의 길라 활동
          </h1>
          <p className="text-base font-medium">여기서 {name}님만의 길라 활동을 관리하세요!</p>
        </div>
        <div>
          <Link href="/dashboard/my-activity/create" className="relative z-10">
            <PlusDiv />
          </Link>
        </div>
      </div>
      <Suspense fallback={<MyActivitySkeleton />}>
        <MyActivityContainer />
      </Suspense>
    </main>
  );
}
