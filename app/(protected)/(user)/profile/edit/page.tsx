import EditProfileItem from '@/app/(protected)/(user)/profile/edit/_components/edit-profile-item';
import { getUserProfileWithIntroducedInfos } from '@/app/data/user';
import EditImageForm from '@/app/(protected)/(user)/profile/edit/_components/edit-image-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { auth } from '@/auth';

export default async function Page() {
  const user = await auth();
  if (!user) return <div>존재하지 않는 유저입니다</div>;
  const userData = await getUserProfileWithIntroducedInfos(user.user?.id);

  return (
    <main className="p-5">
      <Card className="shadow-md">
        <CardHeader className="flex flex-col gap-5">
          <CardTitle className="font-bold text-center">
            <span className="text-3xl text-primary">{user.user?.name}</span>님의 개인정보
          </CardTitle>
          <EditImageForm userImg={user.user?.image ?? '/default-profile-image.png'} />
        </CardHeader>
        <CardContent>
          <EditProfileItem userData={userData.user} />
        </CardContent>
      </Card>
    </main>
  );
}
