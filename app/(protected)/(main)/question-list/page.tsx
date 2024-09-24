import QuestionForm from '@/app/(protected)/(main)/question-list/_components/question-form';
import { QuestionSort } from '@/type';
import { Suspense } from 'react';
import { getSessionUserData } from '@/app/data/user';
import LoginLinkArea from '@/components/loginLink-area';
import QuestionContainer from './_components/question-container';
import QuestionListSkeleton from './_components/question-list-skeleton';

export default async function Page({
  searchParams,
}: {
  searchParams: { sort: QuestionSort; location: string };
}) {
  const { sort, location } = searchParams;
  const session = await getSessionUserData();

  return (
    <main className="w-full">
      <div className="relative flex flex-col items-center w-full gap-4 p-5">
        <h1 className="text-2xl font-semibold">
          <span className="text-3xl font-bold text-primary">길라</span>에게 바로 물어보세요!
        </h1>
        <div className="relative w-full">
          {!session && <LoginLinkArea />}
          <QuestionForm />
        </div>
      </div>
      <div className="flex flex-col items-center w-full gap-2 p-5">
        <Suspense fallback={<QuestionListSkeleton />}>
          <QuestionContainer sort={sort} location={location} />
        </Suspense>
      </div>
    </main>
  );
}
