import React, { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return <div className="p-5 pb-12">{children}</div>;
}
