import { Suspense } from 'react';
import { getSessionUserData } from '@/app/data/user';
import WishListSkeleton from './_components/wishList-skeleton';
import WishListContainer from './_components/wishlist-container';

export default async function Page() {
  const session = await getSessionUserData();

  return (
    <main className="p-5 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">
        <span className="text-3xl text-primary">{session?.nickname}</span>님이 저장한 활동
      </h1>
      <Suspense fallback={<WishListSkeleton />}>
        <WishListContainer />
      </Suspense>
    </main>
  );
}
