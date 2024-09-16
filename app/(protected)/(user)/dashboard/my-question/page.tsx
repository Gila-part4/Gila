import MyQuestionCreateModal from '@/app/(protected)/(user)/dashboard/my-question/_components/my-question-create-modal';
import { Suspense } from 'react';
import { auth } from '@/auth';
import MyQuestionContainer from './_components/my-question-container';
import MyQuestionSkeleton from './_components/my-question-skeleton';

export default async function Page() {
  const user = await auth();

  return (
    <div className="p-5">
      <div className="flex justify-between w-full mb-5">
        <h1 className="text-2xl font-bold">
          <span className="text-3xl text-primary">{user?.user?.name}</span>님의 질문
        </h1>
        <MyQuestionCreateModal />
      </div>
      <Suspense fallback={<MyQuestionSkeleton />}>
        <MyQuestionContainer />
      </Suspense>
    </div>
  );
}
