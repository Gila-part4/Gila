import ProfileImage from '@/app/(protected)/(user)/profile/_components/profile-image';
import { getSessionUserData } from '@/app/data/user';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Suspense } from 'react';
import ProfileContainer from './_components/profile-container';
import ProfileSkeleton from './_components/profile-skeleton';

export default async function Page() {
  const { id, name, image } = await getSessionUserData();

  return (
    <main className="p-5">
      <Suspense fallback={<ProfileSkeleton />}>
        <Card className="shadow-md">
          <CardHeader className="flex flex-col gap-5">
            <CardTitle className="font-bold text-center">
              <span className="text-3xl text-primary">{name}</span>님의 프로필
            </CardTitle>
            <ProfileImage image={image} />
          </CardHeader>
          <CardContent>
            <ProfileContainer id={id} />
          </CardContent>
        </Card>
      </Suspense>
    </main>
  );
}
