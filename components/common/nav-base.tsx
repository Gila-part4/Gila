import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NavSideMenu from '@/components/common/nav-sidemenu';
import { getSessionUserData } from '@/app/data/user';

export default async function NavigationBase({ children }: { children?: ReactNode }) {
  const session = await getSessionUserData();

  return (
    <nav className="tall:sticky fixed left-0 top-0 z-50 flex items-center justify-between h-16 p-3 bg-white border-b bg-opacity-95 w-full">
      <div className="w-[70px] flex items-center justify-start">
        <Link href="/activity-list">
          <div className="w-[55px] h-[35px] relative">
            <Image
              fill
              src="/GilaName.png"
              alt="logo-to-home"
              style={{ objectFit: 'contain' }}
              sizes="(max-width: 768px) 100vw"
              priority
            />
          </div>
        </Link>
      </div>
      {children && <div className="col-span-2">{children}</div>}
      <div className="flex items-center justify-end w-[70px]">
        <NavSideMenu userAvatar={session?.image} user={session?.id} />
      </div>
    </nav>
  );
}
