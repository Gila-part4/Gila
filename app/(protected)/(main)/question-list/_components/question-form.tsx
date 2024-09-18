'use client';

import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createQuestion } from '@/app/action/question';
import QuestionTipPopOver from '@/app/(protected)/(main)/question-list/_components/qusetion-tip-popover';
import { toast } from 'sonner';
import { useTransition } from 'react';
import LocationSelectDrawer from '@/components/location-select-drawer';
import PrimaryCTAButton from '@/components/common/primary-CTA-button';
import { QuestionFormFields } from '@/constants/form-schema';

const FormSchema = z.object({
  title: z
    .string()
    .min(1, { message: '제목을 입력해 주세요.' })
    .max(20, { message: '제목은 20자 이내로 입력해 주세요.' }),
  content: z
    .string()
    .min(1, { message: '내용을 입력해 주세요.' })
    .max(200, { message: '내용은 200자 이내로 입력해 주세요.' }),
  location: z
    .string()
    .min(1, { message: '장소를 선택해 주세요.' })
    .max(20, { message: '내용은 20자 이내로 입력해 주세요.' }),
});

export default function QuestionForm() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      content: '',
      location: '',
    },
  });

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    startTransition(async () => {
      const result = await createQuestion({
        title: values.title,
        content: values.content,
        location: values.location,
      });
      if (!result.success) {
        toast.error(result.message);
        return;
      }
      toast.success(result.message);
      form.reset();
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative flex items-end w-full h-full gap-6 p-4 border rounded-lg shadow-md"
      >
        <div className="flex flex-col w-full gap-3">
          <FormField
            control={form.control}
            name="location"
            render={({ field: { onChange } }) => (
              <FormItem>
                <FormLabel className="text-base">{QuestionFormFields[0].label}</FormLabel>
                <FormControl>
                  <LocationSelectDrawer onChange={onChange} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">{QuestionFormFields[1].label}</FormLabel>
                <FormControl>
                  <Input
                    type={QuestionFormFields[1].type}
                    placeholder={QuestionFormFields[1].placeholder}
                    {...field}
                    className="text-sm"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">{QuestionFormFields[2].label}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={QuestionFormFields[2].placeholder}
                    {...field}
                    className="text-sm"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div>
            <PrimaryCTAButton
              type="submit"
              text="물어보기"
              disabled={isPending || !form.formState.isValid}
              isPending={isPending}
            />
          </div>
        </div>
        <QuestionTipPopOver />
      </form>
    </Form>
  );
}
