import { ActivityWithUserAndRequest } from '@/type';
import formatDateRange from '@/utils/formatDateRange';
import { User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  activity: ActivityWithUserAndRequest;
}

export default function Channel({ activity }: Props) {
  const dateRange = formatDateRange({
    startDateString: activity.startDate,
    endDateString: activity.endDate,
  });

  return (
    <Link href={`/chat/${activity.id}`} scroll={false}>
      <div className="relative flex w-full gap-6 p-3 border shadow-md hover:shadow-xl rounded-lg">
        <div className="w-[110px] h-[110px] relative rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={activity.thumbnails[0] || '/default-carousel-image.png'}
            alt="썸네일"
            fill
            objectFit="cover"
          />
        </div>
        <div className="flex flex-col justify-center w-full gap-2 overflow-hidden">
          <h1 className="w-full text-xl font-bold truncate">{activity.title}</h1>
          <div className="flex flex-col gap-2 text-xs">
            <p>{dateRange}</p>
            <div className="flex items-center gap-2">
              <User width={14} height={14} />
              <p className="text-sm font-bold">
                {activity.activityRequests.length + 1} / {activity.maximumCount + 1} 명
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
