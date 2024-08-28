'use client';

import { Realtime } from 'ably';
import { AblyProvider, ChannelProvider } from 'ably/react';
import { User } from '@/type';
import Chat from './chat';

interface Props {
  channel: string;
  user: User;
}

export default function ChatPage({ channel, user }: Props) {
  const client = new Realtime({
    key: '9bHIxw.wgXGGA:wE33mIt3P8z80cfkKZumcqb6NPL9AbQUKU_SZZ1oZ3M',
    clientId: user.id,
  });
  const channelName = `chat:${channel[0]}`;

  return (
    <AblyProvider client={client}>
      <ChannelProvider channelName={channelName}>
        <Chat channelName={channelName} user={user} />
      </ChannelProvider>
    </AblyProvider>
  );
}
