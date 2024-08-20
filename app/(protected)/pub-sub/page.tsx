'use client';

import * as Ably from 'ably';
import { AblyProvider, ChannelProvider } from 'ably/react';
import AblyPubSub from '@/app/(protected)/pub-sub/_components/ably-pubsub';

// Connect to Ably using the AblyProvider component and your API key
const client = new Ably.Realtime({
  key: 'Tc9v0w.hBZnjw:Pw1blj1AxFPYfUMdvfiCG0Lro5_kp4jQ90Qa1SBO5FA',
});

export default function Page() {
  return (
    <AblyProvider client={client}>
      <ChannelProvider channelName="get-started">
        <AblyPubSub />
      </ChannelProvider>
    </AblyProvider>
  );
}
