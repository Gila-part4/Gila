import { Suspense } from 'react';
import { getSessionUserData } from '@/app/data/user';
import ChatContainer from './_components/chat-container';
import WishListSkeleton from '../wishlist/_components/wishList-skeleton';

export default async function Page() {
  const session = await getSessionUserData();

  return (
    <main className="p-5">
      <div className="flex items-center justify-between w-full pb-5">
        <div>
          <h1 className="text-2xl font-bold">
            <span className="text-3xl text-primary">{session?.nickname}</span>님이 등록한 채팅
          </h1>
          <p className="text-base font-medium">등록한 활동의 참가자들과 소통해보세요!</p>
        </div>
      </div>
      <Suspense fallback={<WishListSkeleton />}>
        <ChatContainer />
      </Suspense>
    </main>
  );
}
