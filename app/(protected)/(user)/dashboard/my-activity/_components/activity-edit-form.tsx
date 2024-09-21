'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import LocationSelectSection from '@/app/(protected)/(user)/dashboard/my-activity/_components/location-select-section';
import ScheduleSection from '@/app/(protected)/(user)/dashboard/my-activity/_components/schedule-section';
import DetailInfoSection from '@/app/(protected)/(user)/dashboard/my-activity/_components/detail-info-section';
import { useState, useTransition } from 'react';
import { editActivity } from '@/app/action/activity';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { ActivityWithFavoriteAndCount } from '@/type';
import { ActivityCreateFormSchema } from '@/constants/form-schema';

export type ActivityCreateFormData = z.infer<typeof ActivityCreateFormSchema>;

export interface ActivityCreateFormProps {
  form: UseFormReturn<ActivityCreateFormData>;
}

interface Props {
  activity: ActivityWithFavoriteAndCount;
  onClose: () => void;
}

export default function ActivityEditForm({ activity, onClose }: Props) {
  const { id, title, description, location, tags, thumbnails, maximumCount, startDate, endDate } =
    activity;
  const [isPending, startTransition] = useTransition();
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const router = useRouter();
  const stringCount = maximumCount.toString();
  const form = useForm<ActivityCreateFormData>({
    resolver: zodResolver(ActivityCreateFormSchema),
    defaultValues: {
      title,
      description,
      location,
      tags,
      images: thumbnails,
      maximumCount: stringCount,
      schedule: { from: startDate, to: endDate },
    },
  });

  const onSubmit = (values: ActivityCreateFormData) => {
    startTransition(async () => {
      const { from, to } = values.schedule;
      const formattedCount = parseInt(values.maximumCount, 10);

      const action = await editActivity({
        activityId: id,
        title: values.title,
        description: values.description,
        tags: values.tags,
        thumbnails: values.images,
        location: values.location,
        startDate: from,
        endDate: to,
        maximumCount: formattedCount,
      });
      if (!action.success) {
        toast.error(action.message);
        return;
      }
      toast.success(action.message);
      onClose();
      router.refresh();
    });
  };

  const handleLoadingChange = (loading: boolean) => {
    setIsUploading(loading);
  };

  return (
    <Form {...form}>
      <main className="min-h-screen bg-white">
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 pb-5">
          <LocationSelectSection
            className="border-none shadow-md bg-white_light"
            form={form}
            defaultLocation={location}
          />
          <ScheduleSection
            className="border-none shadow-md bg-white_light"
            form={form}
            defaultSchedule={{ from: startDate, to: endDate }}
          />
          <DetailInfoSection
            className="border-none shadow-md bg-white_light"
            onLoadingChange={handleLoadingChange}
            form={form}
          />
          <Button
            disabled={isPending || !form.formState.isValid || isUploading}
            type="submit"
            className="w-full text-xl font-semibold text-white shadow-md py-7 disabled:bg-primary_dark"
          >
            수정
          </Button>
        </form>
      </main>
    </Form>
  );
}
