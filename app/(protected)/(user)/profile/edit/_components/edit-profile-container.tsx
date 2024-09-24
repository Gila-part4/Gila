import { getUserProfileWithIntroducedInfos } from '@/app/data/user';
import EditProfileItem from './edit-profile-item';

export default async function EditProfileContainer({ id }: { id: string }) {
  const userData = await getUserProfileWithIntroducedInfos(id);

  return <EditProfileItem userData={userData.user} />;
}
