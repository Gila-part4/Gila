'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */

import { useState } from 'react';
import { useChannel, useConnectionStateListener } from 'ably/react';
import { Message } from 'ably';

export default function AblyPubSub() {
  const [messages, setMessages] = useState<Message[]>([]);

  useConnectionStateListener('connected', () => {
    console.log('Connected to Ably!');
  });

  // Create a channel called 'get-started' and subscribe to all messages with the name 'first' using the useChannel hook
  const { channel } = useChannel('get-started', 'first', (message: Message) => {
    setMessages((previousMessages: Message[]) => [...previousMessages, message]);
  });

  return (
    // Publish a message with the name 'first' and the contents 'Here is my first message!' when the 'Publish' button is clicked
    <div>
      <button
        onClick={() => {
          channel.publish('first', 'Here is my first message!');
        }}
        type="button"
      >
        Publish
      </button>
      {messages.map((message) => {
        return <p key={message.id}>{message.data}</p>;
      })}
    </div>
  );
}
