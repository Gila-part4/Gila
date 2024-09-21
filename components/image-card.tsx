'use client';

import Image from 'next/image';

import React, { ReactNode } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Spinner from '@/components/ui/spinner';

interface Props {
  activityId: string;
  title: string;
  bottomContent?: ReactNode;
  middleContent?: ReactNode;
  imageSrc?: string;
  isPending?: boolean;
}

export default function ImageCard({
  activityId,
  title,
  bottomContent,
  imageSrc,
  isPending,
  middleContent,
}: Props) {
  return (
    <Link href={`/activity/${activityId}`}>
      <Card className="h-[400px] flex flex-col items-start border shadow-md hover:shadow-xl">
        <div className="flex justify-center w-full h-full px-2 pt-2 rounded-md">
          <div className="relative w-full h-full rounded-md">
            <Image
              src={imageSrc || '/default-carousel-image.png'}
              alt="thumbnail"
              fill
              sizes="(max-width: 768px) 100vw"
              style={{ objectFit: 'cover', borderRadius: '8px' }}
            />
          </div>
        </div>
        <div className="flex flex-col w-full gap-1 p-2">
          <CardHeader className="p-0">
            <CardTitle className="text-2xl font-bold text-black truncate">{title}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">{middleContent}</CardContent>
          {bottomContent && <CardFooter className="p-0">{bottomContent}</CardFooter>}
        </div>
        {isPending && (
          <div
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
              e.preventDefault();
            }}
            className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50"
          >
            <Spinner />
          </div>
        )}
      </Card>
    </Link>
  );
}
