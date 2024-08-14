'use client';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import LOCATIONS from '@/constants/locations';
import { Map, RefreshCcw } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';

export default function QuestionLocationPopover({
  selectLocation,
}: {
  selectLocation: (location: string) => void;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [location, setLocation] = useState<string>('');
  const [subLocation, setSubLocation] = useState<string>('');

  const handleSelectValue = useCallback(
    (currentValue: string) => {
      setLocation(currentValue === location ? '' : currentValue);
    },
    [location],
  ); // 현재 도, 광역시, 특별시 결정

  const handleSelectSubLocation = useCallback(
    (currentValue: string) => {
      setSubLocation(currentValue === subLocation ? '' : currentValue);
      setOpen(false);
      selectLocation(`${location} ${currentValue}`);
    },
    [location, selectLocation, subLocation],
  ); // 세부 행정구역 결정

  const subLocations = useMemo(() => {
    return location ? LOCATIONS[location].list : [];
  }, [location]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="text-sm absolute top-2.5 right-2.5">
        <Map className="w-5 h-5" />
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 bg-white">
        <Command>
          <CommandInput placeholder="목적지를 찾아보세요!" />
          <CommandList className="flex justify-center w-[350x] p-1 relative">
            <CommandEmpty>그런 지역은 없어요</CommandEmpty>
            {location || (
              <CommandGroup heading="도・광역시・특별시">
                <ul className="grid grid-cols-3 gap-3 mt-1">
                  {Object.keys(LOCATIONS).map((province) => (
                    <CommandItem
                      key={province}
                      value={province}
                      onSelect={handleSelectValue}
                      className="flex items-center justify-center w-full border rounded-lg hover:bg-gray-100"
                    >
                      {province}
                    </CommandItem>
                  ))}
                </ul>
              </CommandGroup>
            )}
            {location && (
              <CommandGroup>
                <ul className="grid grid-cols-3 gap-3 mt-1">
                  {subLocations.map((city) => (
                    <CommandItem
                      key={city.state}
                      value={city.state}
                      onSelect={handleSelectSubLocation}
                      className="flex items-center justify-center w-full border rounded-lg hover:bg-gray-100"
                    >
                      {city.state}
                    </CommandItem>
                  ))}
                </ul>
              </CommandGroup>
            )}
            <div className="absolute flex justify-end right-3 top-1.5">
              <Button
                type="button"
                onClick={() => {
                  setLocation('');
                  setSubLocation('');
                }}
                className="flex items-center justify-center p-1 text-white bg-black rounded-full size-6"
              >
                <RefreshCcw className="size-full" />
              </Button>
            </div>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
