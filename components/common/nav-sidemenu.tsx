'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Image from 'next/image';
import { LogIn, LogOut, Menu } from 'lucide-react';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { logout } from '@/app/action/user';
import { toast } from 'sonner';
import SideMenuAccordion from '@/components/common/sidemenu-accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Props {
  userAvatar: string | null | undefined;
  user?: string;
}

export default function NavSideMenu({ userAvatar, user }: Props) {
  const [isPending, startTrasition] = useTransition();
  const router = useRouter();

  const Logout = async () => {
    startTrasition(async () => {
      const action = await logout();
      if (!action.success) {
        toast.error(action.message);
        return;
      }
      router.replace('/');
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="relative flex items-center w-[35px] h-[35px] overflow-hidden rounded-3xl bg-white_light shadow-md group transition-all hover:w-[70px] duration-300 ease-in-out">
          <div className="flex items-center gap-1 transition-transform duration-300 ease-in-out">
            <Avatar className="size-[35px]">
              <AvatarImage
                src={userAvatar || '/default-profile-image.png'}
                alt="user-avatar"
                sizes="(max-width: 768px) 100vw"
                style={{ objectFit: 'cover' }}
              />
              <AvatarFallback className="flex items-center justify-center">
                <Image
                  src="/default-profile-image.png"
                  width={35}
                  height={35}
                  alt="default-profile"
                  priority
                />
              </AvatarFallback>
            </Avatar>
          </div>
          <button
            type="button"
            className="absolute right-0 top-0 flex items-center justify-center w-[35px] h-[35px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
            aria-label="profile"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </SheetTrigger>
      <SheetContent className="border-none bg-opacity-90 bg-white_light" side="left">
        <SheetTitle>메뉴</SheetTitle>
        <SheetDescription aria-describedby={undefined} />
        <div className="flex flex-col justify-between h-full py-4">
          <SideMenuAccordion />
          <button
            disabled={isPending}
            onClick={() => (user ? Logout() : router.push('/sign-in'))}
            type="button"
            className="flex items-center text-black transition-all h-10 rounded-lg w-fit hover:text-primary gap-2"
          >
            {user ? (
              <>
                <LogOut width={20} height={20} />
                <p className="font-semibold text-sm">로그아웃</p>
              </>
            ) : (
              <>
                <LogIn width={20} height={20} />
                <p className="font-semibold text-sm">로그인</p>
              </>
            )}
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
