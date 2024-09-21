'use client';

import formatDateRange from '@/utils/formatDateRange';
import { User } from 'lucide-react';
import Image from 'next/image';

interface Props {
  title: string;
  startDate: Date;
  endDate: Date;
  participants?: number;
  imageSrc?: string[];
}

export default function WishlistImageCard({
  title,
  startDate,
  endDate,
  participants,
  imageSrc,
}: Props) {
  const imgSrc = imageSrc && imageSrc.length > 0 ? imageSrc[0] : '/default-carousel-image.png';
  const formatDate = formatDateRange({ startDateString: startDate, endDateString: endDate });

  return (
    <div className="relative flex w-full gap-6 p-3 rounded-lg border shadow-md hover:shadow-xl">
      <div className="w-[110px] h-[110px] relative rounded-lg overflow-hidden flex-shrink-0">
        <Image src={imgSrc} alt="썸네일" fill style={{ objectFit: 'cover' }} />
      </div>
      <div className="flex flex-col justify-center w-full gap-2 overflow-hidden">
        <h1 className="w-full text-xl font-bold truncate">{title}</h1>
        <div className="flex flex-col gap-2 text-xs">
          <p>{formatDate}</p>
          <div className="flex items-center gap-2">
            <User width={14} height={14} />
            {participants && <p className="text-sm font-bold">{participants}명</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
