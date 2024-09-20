import { getActivityById } from '@/app/data/activity';
import { getCurrentUserId } from '@/app/data/user';
import PromiseRequestForm from './promise-request-form';

export default async function RequestContainer({ activityId }: { activityId: string }) {
  const activity = await getActivityById(activityId);
  const currentUser = await getCurrentUserId();

  return <PromiseRequestForm activity={activity} currentUser={currentUser} />;
}
