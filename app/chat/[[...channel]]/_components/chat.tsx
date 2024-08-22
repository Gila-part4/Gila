/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { useChannel } from 'ably/react';
import { useReducer, useEffect, useRef } from 'react';
import MessageInput from './message-input';
import MessageList from './message-list';

const ADD = 'ADD';

// eslint-disable-next-line consistent-return
const reducer = (prev, event) => {
  // eslint-disable-next-line default-case
  switch (event.name) {
    // 👉 Append the message to messages
    case ADD:
      return [...prev, event];
  }
};

export default function Chat({ channelName }: { channelName: string }) {
  // 👉 Placeholder user to be replaced with the authenticated user later
  const user = {
    imageUrl: 'https://ui-avatars.com/api/?name=Alex',
  };
  const [messages, dispatch] = useReducer(reducer, []);
  // 👉 useChannel accepts the channel name and a function to invoke when
  //    new messages are received. We pass dispatch.
  const { channel, publish } = useChannel(channelName, dispatch);
  const scrollRef = useRef<HTMLDivElement>(null);

  const publishMessage = (text: string) => {
    // 👉 Publish event through Ably
    publish({
      name: ADD,
      data: {
        text,
        avatarUrl: user.imageUrl,
      },
    });
  };

  useEffect(() => {
    let ignore = false;
    const fetchHist = async () => {
      const history = await channel.history({ limit: 100, direction: 'forwards' });
      if (!ignore) history.items.forEach(dispatch);
    };
    fetchHist();
    return () => {
      ignore = true;
    };
  }, [channel]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView();
    }
  }, [messages.length]);

  return (
    <>
      <div className="overflow-y-auto p-5">
        <MessageList messages={messages} />
        <div ref={scrollRef} />
      </div>
      <div className="mt-auto p-5">
        <MessageInput onSubmit={publishMessage} />
      </div>
    </>
  );
}
