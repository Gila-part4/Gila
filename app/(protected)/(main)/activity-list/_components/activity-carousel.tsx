/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { useCallback, useEffect, useState } from 'react';
import { getActivitiesByLocation } from '@/app/data/activity';
import { ActivityWithUserAndFavoCount } from '@/type';
import ActivityCardSkeleton from '@/components/skeletons/activity-card-skeleton';
import ActivityListCard from './activity-list-card';

export default function ActivityCarousel({ userLocation }: { userLocation: string }) {
  const [recommendList, setRecommentList] = useState<ActivityWithUserAndFavoCount[]>([]);

  const getAddress = (mapResult: any, mapStatus: any) => {
    if (mapStatus === window.kakao.maps.services.Status.OK) {
      localStorage.setItem(
        'location',
        `${mapResult[0].region_1depth_name} ${mapResult[0].region_2depth_name}`,
      );
    }
  };

  const onLoadKakaoMap = useCallback(() => {
    window.kakao.maps.load(() => {
      const geocoder = new window.kakao.maps.services.Geocoder();
      navigator.geolocation.getCurrentPosition((i) => {
        geocoder.coord2RegionCode(i.coords.longitude, i.coords.latitude, getAddress);
      });
    });
  }, []);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      onLoadKakaoMap();
    } else {
      const mapScript = document.createElement('script');
      mapScript.async = true;
      mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&autoload=false&libraries=services,clusterer,drawing`;
      document.head.appendChild(mapScript);
      mapScript.addEventListener('load', onLoadKakaoMap);

      return () => {
        mapScript.removeEventListener('load', onLoadKakaoMap);
        document.head.removeChild(mapScript);
      };
    }
  }, [onLoadKakaoMap]);

  useEffect(() => {
    const test = async (location: string) => {
      const result = await getActivitiesByLocation({ location, size: 5, cursor: '' });
      setRecommentList([...result.activities]);
    };
    if (userLocation) {
      test(userLocation);
    }
  }, [userLocation]);

  return (
    <div className="bg-gray_200 py-5 flex flex-col gap-5 mt-6 rounded-lg">
      {userLocation ? (
        <>
          <p className="text-xl font-semibold px-5">
            <span className="text-xl text-primary">{userLocation}</span>
            에서 같이 해요!
          </p>
          <div className="overflow-x-scroll [&::-webkit-scrollbar]:hidden">
            <ul className="flex gap-4  w-fit">
              {recommendList.map((item, index) => (
                <li
                  key={item.id}
                  className={`w-[280px] ${index === 0 && 'ml-5'} ${recommendList.length - 1 === index && 'mr-5'}`}
                >
                  <ActivityListCard activity={item} />
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <>
          <div>
            <p className="text-lg font-semibold">위치 권한을 허용해주세요!</p>
            <p className="text-sm">접속하신 지역을 기준으로 길라를 추천해드릴께요!</p>
          </div>
          <div>
            <ActivityCardSkeleton />
          </div>
        </>
      )}
    </div>
  );
}
