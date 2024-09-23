import { getUserProfileWithIntroducedInfos } from '@/app/data/user';
import ProfileItem from '@/components/profile-item';

export default async function ProfileContainer({ id }: { id: string }) {
  const userData = await getUserProfileWithIntroducedInfos(id);

  return <ProfileItem userData={userData} />;
}
