'use client';

import { useState, useTransition } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import LocationSelectSection from '@/app/(protected)/(user)/dashboard/my-activity/_components/location-select-section';
import ScheduleSection from '@/app/(protected)/(user)/dashboard/my-activity/_components/schedule-section';
import DetailInfoSection from '@/app/(protected)/(user)/dashboard/my-activity/_components/detail-info-section';
import { createActivity } from '@/app/action/activity';
import { ActivityCreateFormSchema } from '@/constants/form-schema';

export type ActivityCreateFormData = z.infer<typeof ActivityCreateFormSchema>;

export interface ActivityCreateFormProps {
  form: UseFormReturn<ActivityCreateFormData>;
}

export default function ActivityCreateForm() {
  const [isPending, startTransition] = useTransition();
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<ActivityCreateFormData>({
    resolver: zodResolver(ActivityCreateFormSchema),
    defaultValues: {
      title: '',
      description: '',
      location: '',
      tags: [],
      images: [],
      maximumCount: '1',
    },
  });

  const onSubmit = ({
    title,
    description,
    schedule,
    tags,
    location,
    maximumCount,
    images,
  }: ActivityCreateFormData) => {
    startTransition(async () => {
      const { from, to } = schedule;
      const formattedCount = parseInt(maximumCount, 10);

      const action = await createActivity({
        title,
        description,
        tags,
        thumbnails: images,
        location,
        startDate: from,
        endDate: to,
        maximumCount: formattedCount,
      });
      if (!action.success) {
        toast.error(action.message);
        return;
      }
      toast.success(action.message);
      router.replace('/dashboard/my-activity');
    });
  };

  const handleLoadingChange = (loading: boolean) => {
    setIsUploading(loading);
  };

  return (
    <Form {...form}>
      <main className="min-h-screen bg-white_light">
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <LocationSelectSection className="border shadow-md bg-white_light" form={form} />
          <ScheduleSection className="border shadow-md bg-white_light" form={form} />
          <DetailInfoSection
            className="border shadow-md bg-white_light"
            onLoadingChange={handleLoadingChange}
            form={form}
          />
          <Button
            disabled={isPending || isUploading || !form.formState.isValid}
            type="submit"
            className="w-full text-xl font-semibold text-white shadow-md py-7 disabled:bg-primary_dark"
          >
            확정
          </Button>
        </form>
      </main>
    </Form>
  );
}
