'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function LandingHeroSection() {
  const router = useRouter();
  return (
    <section className="flex flex-col items-center justify-center gap-3 pt-20 bg-white_light">
      <h1 className="text-4xl font-bold text-center">
        당신의 <span className="text-primary">길라잡이</span>가
        <br /> 되어드릴께요!
      </h1>
      <div className="w-[220px] h-[100px] relative">
        <Image fill src="/GilaName.png" alt="text-main-logo" style={{ objectFit: 'cover' }} />
      </div>
      <Button
        className="text-sm font-semibold text-white border border-none rounded-md bg-primary hover:bg-primary_dark"
        onClick={() => router.push('/activity-list')}
        size="lg"
      >
        바로가기
      </Button>
      <div className="w-full h-40 relative">
        <Image
          src="/LandingBackground.jpg"
          alt="렌딩 배경이미지"
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
    </section>
  );
}
