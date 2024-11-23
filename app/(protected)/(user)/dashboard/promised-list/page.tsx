import { Suspense } from 'react';
import { getSessionUserData } from '@/app/data/user';
import PromisedContainer from './_components/promised-container';
import PromisedSkeleton from './_components/promised-skeleton';

export default async function Page() {
  const session = await getSessionUserData();

  return (
    <main className="p-5 flex flex-col gap-4">
      <h1 className="w-full text-2xl font-bold">
        <span className="text-3xl text-primary">{session?.nickname}</span>님과 함께하고 싶대요!
      </h1>
      <Suspense fallback={<PromisedSkeleton />}>
        <PromisedContainer />
      </Suspense>
    </main>
  );
}
