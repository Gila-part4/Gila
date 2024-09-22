import EditProfileItem from '@/app/(protected)/(user)/profile/edit/_components/edit-profile-item';
import { getSessionUserData, getUserProfileWithIntroducedInfos } from '@/app/data/user';
import EditImageForm from '@/app/(protected)/(user)/profile/edit/_components/edit-image-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function Page() {
  const { id, name, image } = await getSessionUserData();
  const userData = await getUserProfileWithIntroducedInfos(id);

  return (
    <main className="p-5">
      <Card className="shadow-md">
        <CardHeader className="flex flex-col gap-5">
          <CardTitle className="font-bold text-center">
            <span className="text-3xl text-primary">{name}</span>님의 개인정보
          </CardTitle>
          <EditImageForm userImg={image ?? '/default-profile-image.png'} />
        </CardHeader>
        <CardContent>
          <EditProfileItem userData={userData.user} />
        </CardContent>
      </Card>
    </main>
  );
}
