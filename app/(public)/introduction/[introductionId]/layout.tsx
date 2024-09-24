import { ReactNode } from 'react';
import NavigationBase from '@/components/common/nav-base';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative max-w-[420px]">
      <NavigationBase />
      <div className="h-[calc(100vh-64px)] overflow-y-scroll">{children}</div>
    </div>
  );
}
