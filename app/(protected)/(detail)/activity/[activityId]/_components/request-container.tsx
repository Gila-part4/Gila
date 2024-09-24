import { getActivityById } from '@/app/data/activity';
import { getSessionUserData } from '@/app/data/user';
import PromiseRequestForm from './promise-request-form';

export default async function RequestContainer({ activityId }: { activityId: string }) {
  const activity = await getActivityById(activityId);
  const session = await getSessionUserData();

  return <PromiseRequestForm activity={activity} currentUser={session?.id} />;
}
