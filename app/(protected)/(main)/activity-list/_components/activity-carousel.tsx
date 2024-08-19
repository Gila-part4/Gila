/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { useCallback, useEffect, useState } from 'react';
import { getActivitiesByLocation } from '@/app/data/activity';
import { ActivityWithUserAndFavoCount } from '@/type';
import ActivityCardSkeleton from '@/components/skeletons/activity-card-skeleton';
import LOCATIONS from '@/constants/locations';
import calculateDistanceInMeters from '@/utils/calculateDistance';
import ActivityListCard from './activity-list-card';

export default function ActivityCarousel() {
  const [recommendList, setRecommentList] = useState<ActivityWithUserAndFavoCount[]>([]);
  const [userLocation, setUserLocation] = useState<string[]>([]);

  const getAddress = (mapResult: any, mapStatus: any) => {
    if (mapStatus === window.kakao.maps.services.Status.OK) {
      const replaceEmpty = mapResult[0].region_2depth_name.split(' ');
      const currentLocation = `${mapResult[0].region_1depth_name} ${replaceEmpty[0]}`;
      const { id, list } = LOCATIONS[mapResult[0].region_1depth_name];
      if (id > 10) {
        setUserLocation([currentLocation]);
        return;
      }
      let firstDistance = 0;
      let secondeDistance = 0;
      let nearByLocation;
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < list.length; i++) {
        if (mapResult[0].region_2depth_name !== list[i].state) {
          const distance = calculateDistanceInMeters(
            mapResult[0].y,
            mapResult[0].x,
            list[i].location.latitude,
            list[i].location.longitude,
          );
          secondeDistance = Number((distance / 1000).toFixed(2));
          if (!firstDistance) {
            firstDistance = secondeDistance;
          } else if (firstDistance > secondeDistance) {
            firstDistance = secondeDistance;
            nearByLocation = list[i].state;
          }
        }
      }
      const userLocationList = [
        currentLocation,
        `${mapResult[0].region_1depth_name} ${nearByLocation}`,
      ];
      setUserLocation([...userLocationList]);
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
      mapScript.src = `//dapi.Kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&autoload=false&libraries=services,clusterer,drawing`;
      document.head.appendChild(mapScript);
      mapScript.addEventListener('load', onLoadKakaoMap);

      return () => {
        mapScript.removeEventListener('load', onLoadKakaoMap);
        document.head.removeChild(mapScript);
      };
    }
  }, [onLoadKakaoMap]);

  const activityByLocation = async (location: string[]) => {
    const result = await getActivitiesByLocation({
      location: location[0],
      secondeLocation: location[1],
      size: 5,
    });
    setRecommentList([...result.activities]);
  };

  useEffect(() => {
    if (userLocation.length > 0) {
      activityByLocation(userLocation);
    }
  }, [userLocation]);

  return (
    <div className="border py-5 flex flex-col gap-5 mb-6 rounded-lg">
      {userLocation[0] ? (
        <>
          <p className="text-xl font-semibold px-5">
            나랑 가까운
            <span className="text-xl text-primary"> 길라</span>를 추천해드릴께요!
          </p>
          {recommendList[0] ? (
            <div className="overflow-x-scroll [&::-webkit-scrollbar]:hidden h-full">
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
          ) : (
            <div className="px-5">
              <div>
                <p className="text-xl font-semibold">근처에서 길라를 찾을 수 없어요!</p>
              </div>
              <div>
                <ActivityCardSkeleton />
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="px-5">
          <div>
            <p className="text-xl font-semibold">위치 권한을 허용해주세요!</p>
            <p className="text-sm">접속하신 지역을 기준으로 길라를 추천해드릴께요!</p>
          </div>
          <div>
            <ActivityCardSkeleton />
          </div>
        </div>
      )}
    </div>
  );
}
