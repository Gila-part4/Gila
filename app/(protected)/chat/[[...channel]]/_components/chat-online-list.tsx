/* eslint-disable @typescript-eslint/no-explicit-any */
import ChatOnlineUser from './chat-online-user';

export default function ChatOnlineList({ users }: { users: any }) {
  return (
    <ul className="flex flex-col">
      {users.map((item: any) => (
        <li key={item.id}>
          <ChatOnlineUser user={item} />
        </li>
      ))}
    </ul>
  );
}
