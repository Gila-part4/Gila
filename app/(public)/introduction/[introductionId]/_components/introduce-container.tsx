import ProfileContainer from '@/app/(protected)/(user)/profile/_components/profile-container';
import ProfileImage from '@/app/(protected)/(user)/profile/_components/profile-image';
import { getUserProfileWithIntroducedInfos } from '@/app/data/user';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function IntroduceContainer({ id }: { id: string }) {
  const userData = await getUserProfileWithIntroducedInfos(id);

  return (
    <Card className="shadow-md">
      <CardHeader className="flex flex-col gap-5">
        <CardTitle className="font-bold text-center">
          <span className="text-3xl text-primary">{userData.user.nickname}</span>님의 프로필
        </CardTitle>
        <ProfileImage image={userData.user.image} />
      </CardHeader>
      <CardContent>
        <ProfileContainer id={id} />
      </CardContent>
    </Card>
  );
}
