'use client';

import Link from 'next/link';
import LoginForm from '@/app/(auth)/sign-in/_components/login-form';
import { loginByOAuth } from '@/app/action/user';
import { Button } from '@/components/ui/button';
import KakaoIcon from '@/public/kakao-icon-black.svg';
import Image from 'next/image';

export default function Page() {
  return (
    <div className="flex flex-col justify-center items-center gap-3 px-5">
      <LoginForm />
      <p className="text-gray-500">or</p>
      <Button
        className="bg-white_light border w-full"
        type="button"
        onClick={() => loginByOAuth('kakao')}
      >
        <Image src={KakaoIcon} alt="카카오 아이콘" width={25} height={25} />
      </Button>
      <div className="flex items-center justify-center gap-x-2">
        <p className="text-gray-500">
          길라가 처음인가요?
          <Link
            href="/sign-up"
            className="font-semibold underline text-primary hover:text-primary_dark focus:text-primary_dark"
          >
            회원가입하기
          </Link>
        </p>
      </div>
    </div>
  );
}
