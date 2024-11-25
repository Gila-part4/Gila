import ProfileImage from '@/app/(protected)/(user)/profile/_components/profile-image';
import { getSessionUserData } from '@/app/data/user';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Suspense } from 'react';
import ProfileContainer from './_components/profile-container';
import ProfileSkeleton from './_components/profile-skeleton';

export default async function Page() {
  const session = await getSessionUserData();
  if (!session) return <div>인증이 필요합니다.</div>;

  return (
    <main className="p-5">
      <Suspense fallback={<ProfileSkeleton />}>
        <Card className="shadow-md">
          <CardHeader className="flex flex-col gap-5">
            <CardTitle className="font-bold text-center">
              <span className="text-3xl text-primary">{session.nickname}</span>님의 프로필
            </CardTitle>
            <ProfileImage image={session.image} />
          </CardHeader>
          <CardContent>
            <ProfileContainer id={session.id} />
          </CardContent>
        </Card>
      </Suspense>
    </main>
  );
}
