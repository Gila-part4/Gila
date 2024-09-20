import { getActivityById } from '@/app/data/activity';
import { auth } from '@/auth';
import PromiseRequestForm from './promise-request-form';

export default async function RequestContainer({ activityId }: { activityId: string }) {
  const activity = await getActivityById(activityId);
  const user = await auth();

  return <PromiseRequestForm activity={activity} currentUser={user?.user?.id} />;
}
