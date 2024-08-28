/* eslint-disable @typescript-eslint/no-explicit-any */
import { Circle } from 'lucide-react';

export default function ChatOnlineUser({ user }: { user: any }) {
  return (
    <div className="flex items-center">
      <Circle className="mr-1" size={8} fill="#01FE19" color="#01FE19" />
      {user.data.fullName}
    </div>
  );
}
