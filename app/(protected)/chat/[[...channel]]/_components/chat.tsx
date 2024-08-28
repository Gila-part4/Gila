/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { useChannel, usePresence, usePresenceListener } from 'ably/react';
import { useReducer, useEffect, useRef } from 'react';
import { User } from '@/type';
import MessageInput from './message-input';
import MessageList from './message-list';

interface Props {
  channelName: string;
  user: User;
}

const ADD = 'ADD';

const reducer = (prev: any, event: any) => {
  switch (event.name) {
    case ADD:
      return [...prev, event];
    default:
      return prev;
  }
};

export default function Chat({ channelName, user }: Props) {
  const [messages, dispatch] = useReducer(reducer, []);
  const { channel, publish } = useChannel(channelName, dispatch);
  const scrollRef = useRef<HTMLDivElement>(null);
  usePresence(channelName, { fullName: user.nickname });
  const { presenceData } = usePresenceListener(channelName);

  const publishMessage = (text: string) => {
    publish({
      name: ADD,
      data: {
        text,
        avatarUrl: user.image,
        nickname: user.nickname,
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
  }, [messages]);

  return (
    <>
      <div className="overflow-y-scroll p-5 pb-0 h-[calc(100vh-64px-66px)] bg-white_light">
        <p className="text-xs text-center text-gray-400">
          ※ 24시간이 지난 대화는 저장되지 않습니다!
        </p>
        <MessageList messages={messages} user={user} />
        <div ref={scrollRef} />
      </div>
      <div className="mt-auto p-3 tall:sticky fixed left-0 bottom-0 right-0 border">
        <MessageInput onSubmit={publishMessage} />
      </div>
    </>
  );
}
