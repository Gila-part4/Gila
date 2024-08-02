import ProfileItem from '@/app/(protected)/(user)/profile/_components/profile-Item';
import { getCurrentUserId, getUserProfileWithIntroducedInfos } from '@/app/data/user';
import UserImage from '@/app/(protected)/(user)/profile/_components/user-Image';

export default async function Page() {
  const userId = await getCurrentUserId();
  const userData = await getUserProfileWithIntroducedInfos(userId);

  return (
    <div className="m-8">
      <UserImage userData={userData.user} />
      <ProfileItem userData={userData} />
    </div>
  );
}
