'use client';

import { loginByOAuth } from '@/app/action/user';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import KakaoIcon from '@/public/kakao-icon-black.svg';

export default function OAuthButton() {
  return (
    <>
      <div className="flex w-full justify-center items-center gap-2">
        <Separator className="w-1/3 bg-gray_300" />
        <p className="text-gray-500">or</p>
        <Separator className="w-1/3 bg-gray_300" />
      </div>
      <Button
        className="bg-white_light border w-full"
        type="button"
        onClick={() => loginByOAuth('kakao')}
      >
        <Image src={KakaoIcon} alt="카카오 아이콘" width={25} height={25} />
      </Button>
    </>
  );
}
