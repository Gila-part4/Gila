'use client';

import { ActivityWithUserAndFavoCount, Sort } from '@/type';
import ActivityList from '@/app/(protected)/(main)/activity-list/_components/activity-list';
import SortingDropdown from '@/components/sorting-dropdown';
import { ACTIVITYSORTS } from '@/constants/sort';
import { useCallback, useEffect } from 'react';
import { getActivitiesByLocation } from '@/app/data/activity';

interface Props {
  activities: ActivityWithUserAndFavoCount[];
  cursorId: string | null;
  sort: Sort;
}

export default function ActivityContainer({ activities, cursorId, sort }: Props) {
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
    const userLocation = localStorage.getItem('location');
    const test = async (location: string) => {
      const result = await getActivitiesByLocation({ location, size: 5, cursor: '' });
      console.log(result);
    };
    if (userLocation) {
      test(userLocation);
    }
  }, []);

  return (
    <section className="flex flex-col gap-2 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">길라 목록</h1>
        <SortingDropdown sorts={ACTIVITYSORTS} />
      </div>
      <ActivityList activities={activities} cursorId={cursorId} sort={sort} />
    </section>
  );
}
