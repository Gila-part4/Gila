import ProfileItem from '@/components/profile-item';
import ProfileImage from '@/app/(protected)/(user)/profile/_components/profile-image';
import { getSessionUserData, getUserProfileWithIntroducedInfos } from '@/app/data/user';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function Page() {
  const { id, name, image } = await getSessionUserData();
  const userData = await getUserProfileWithIntroducedInfos(id);

  return (
    <main className="p-5">
      <Card className="shadow-md">
        <CardHeader className="flex flex-col gap-5">
          <CardTitle className="font-bold text-center">
            <span className="text-3xl text-primary">{name}</span>님의 프로필
          </CardTitle>
          <ProfileImage image={image} />
        </CardHeader>
        <CardContent>
          <ProfileItem userData={userData} />
        </CardContent>
      </Card>
    </main>
  );
}
