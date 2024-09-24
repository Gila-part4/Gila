'use client';

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

export default function LoginLinkArea() {
  const route = useRouter();
  const linkLoginPage = () => {
    route.push('/sign-in');
  };

  return (
    <div className="absolute inset-0 bg-gray-200/70 z-10 flex flex-col justify-center items-center rounded-lg">
      <Button
        type="button"
        className="px-4 py-2 text-sm font-semibold text-white border border-none rounded-md bg-primary hover:bg-primary_dark opacity-none z-20"
        onClick={linkLoginPage}
      >
        로그인후 이용하기
      </Button>
    </div>
  );
}
