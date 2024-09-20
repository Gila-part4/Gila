import ProfileItem from '@/components/profile-item';
import ProfileImage from '@/app/(protected)/(user)/profile/_components/profile-image';
import { getUserProfileWithIntroducedInfos } from '@/app/data/user';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { auth } from '@/auth';

export default async function Page() {
  const user = await auth();
  if (!user) return <div>존재하지 않는 유저입니다.</div>;
  const userData = await getUserProfileWithIntroducedInfos(user.user?.id);

  return (
    <main className="p-5">
      <Card className="shadow-md">
        <CardHeader className="flex flex-col gap-5">
          <CardTitle className="font-bold text-center">
            <span className="text-3xl text-primary">{user.user?.name}</span>님의 프로필
          </CardTitle>
          <ProfileImage image={user.user?.image} />
        </CardHeader>
        <CardContent>
          <ProfileItem userData={userData} />
        </CardContent>
      </Card>
    </main>
  );
}
