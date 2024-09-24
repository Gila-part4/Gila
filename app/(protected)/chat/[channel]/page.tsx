import { getCurrentUser } from '@/app/data/user';
import { getChannelById } from '@/app/data/chat';
import ChatPage from '@/app/(protected)/chat/[channel]/_components/chat-page';

export default async function Page({ params }: { params: { channel: string } }) {
  const user = await getCurrentUser();
  const activity = await getChannelById(params.channel);

  if (!user) return <div>인증이 필요합니다.</div>;
  return (
    <ChatPage
      channel={params.channel}
      user={user}
      activityTitle={activity.title}
      member={activity.activityRequests}
      owner={activity.user}
    />
  );
}
