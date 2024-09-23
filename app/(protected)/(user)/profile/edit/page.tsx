import { getSessionUserData } from '@/app/data/user';
import EditImageForm from '@/app/(protected)/(user)/profile/edit/_components/edit-image-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Suspense } from 'react';
import ProfileSkeleton from '../_components/profile-skeleton';
import EditProfileContainer from './_components/edit-profile-container';

export default async function Page() {
  const { id, name, image } = await getSessionUserData();

  return (
    <main className="p-5">
      <Suspense fallback={<ProfileSkeleton />}>
        <Card className="shadow-md">
          <CardHeader className="flex flex-col gap-5">
            <CardTitle className="font-bold text-center">
              <span className="text-3xl text-primary">{name}</span>님의 개인정보
            </CardTitle>
            <EditImageForm userImg={image ?? '/default-profile-image.png'} />
          </CardHeader>
          <CardContent>
            <EditProfileContainer id={id} />
          </CardContent>
        </Card>
      </Suspense>
    </main>
  );
}
