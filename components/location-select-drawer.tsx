'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import {
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Drawer,
  DrawerFooter,
  DrawerClose,
  DrawerDescription,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import LOCATIONS from '@/constants/locations';
import { Map } from 'lucide-react';
import { cn } from '@/lib/utils';
import PrimaryCTAButton from '@/components/common/primary-CTA-button';

interface Props {
  defaultLocation?: string;
  onChange: (value: string) => void;
}

export default function LocationSelectDrawer({ defaultLocation, onChange }: Props) {
  const [isDrawOpen, setIsDrawOpen] = useState(false);
  const [province, setProvince] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const cities = useMemo(() => {
    return province ? LOCATIONS[province].list : [];
  }, [province]);

  const handleSelectProvince = (provinceLocation: string) => {
    if (provinceLocation === '세종특별자치시') {
      onChange(provinceLocation);
      setSelectedLocation(provinceLocation);
      setIsDrawOpen(false);
    } else {
      setProvince(provinceLocation);
    }
  };

  const handleSelectLocation = (location: string) => {
    const fullLocation = `${province} ${location}`;
    onChange(fullLocation);
    setSelectedLocation(fullLocation);
    setProvince(null); // 지역선택하면 처음부터 선택하도록 유도하는게 좋을 것 같아서 초기화 시켰습니다.
    setIsDrawOpen(false);
  };

  const handleResetLocation = () => {
    setProvince(null);
    setSelectedLocation(null);
    onChange('');
  };

  useEffect(() => {
    if (defaultLocation) {
      setSelectedLocation(defaultLocation);
    }
  }, [defaultLocation]);

  return (
    <Drawer open={isDrawOpen} onOpenChange={setIsDrawOpen}>
      <DrawerTrigger className="flex items-center w-full">
        <Input
          type="text"
          placeholder={
            selectedLocation ? `${selectedLocation}` : '지도를 눌러 지역을 선택해 보세요!'
          }
          className={cn(
            selectedLocation && 'bg-white text-black',
            'h-10 text-sm text-black bg-gray-100 rounded-r-none',
          )}
        />
        <Map className="w-10 h-10 p-1 text-white rounded-r size-5 bg-primary hover:bg-primary/75 active:bg-primary/50" />
      </DrawerTrigger>
      <DrawerContent className="bg-white_light tall:left-[calc(50vw-10px)] tall:max-w-[420px]">
        <DrawerHeader>
          <DrawerTitle className="text-2xl">지역을 선택하세요</DrawerTitle>
          <DrawerDescription className="">
            도・광역시・특별시를 먼저 선택하시고 시・군・구를 선택해 주세요.
            <span className="text-xs text-gray-800">(세종특별자치시 제외)</span>
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <Command>
            <CommandList className="flex p-2 relative justify-center shadow-[inset_0_0_5px_rgb(0,0,0,0.1)]">
              <CommandEmpty>지역 초기화를 해주세요!</CommandEmpty>
              {province === null && (
                <CommandGroup>
                  <ul className="grid grid-cols-3 gap-3">
                    {Object.keys(LOCATIONS).map((_province) => (
                      <CommandItem
                        key={_province}
                        value={_province}
                        onSelect={handleSelectProvince}
                        className="flex items-center justify-center p-2 font-medium rounded-lg shadow-md hover:bg-gray-100"
                      >
                        {_province}
                      </CommandItem>
                    ))}
                  </ul>
                </CommandGroup>
              )}
              {cities && (
                <CommandGroup>
                  <ul className="grid grid-cols-3 gap-3">
                    {cities.map((city) => (
                      <CommandItem
                        key={city.state}
                        value={city.state}
                        onSelect={handleSelectLocation}
                        className="flex items-center justify-center p-2 font-medium rounded-lg shadow-md hover:bg-gray-100"
                      >
                        {city.state}
                      </CommandItem>
                    ))}
                  </ul>
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </div>
        <DrawerFooter>
          <Button
            type="button"
            onClick={handleResetLocation}
            className="text-base text-white shadow-md bg-slate-800"
          >
            초기화
          </Button>
          <DrawerClose asChild>
            <PrimaryCTAButton text="확정" type="button" disabled={!province} />
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
