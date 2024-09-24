import ProfileSkeleton from '@/app/(protected)/(user)/profile/_components/profile-skeleton';
import BackButton from '@/components/common/back-button';
import { Suspense } from 'react';
import IntroduceContainer from './_components/introduce-container';

interface Params {
  introductionId: string;
}

export default async function Page({ params }: { params: Params }) {
  const id = params.introductionId;

  return (
    <main className="p-5 max-w-[420px] h-full">
      <div className="pb-5">
        <BackButton />
      </div>
      <Suspense fallback={<ProfileSkeleton />}>
        <IntroduceContainer id={id} />
      </Suspense>
    </main>
  );
}
