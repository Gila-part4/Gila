'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createQuestion } from '@/app/action/question';
import { toast } from 'sonner';
import { useTransition } from 'react';
import LocationSelectDrawer from '@/components/location-select-drawer';
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

export default function MyQuestionForm({ toggleModal }: { toggleModal: () => void }) {
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
      toggleModal();
      toast.success(result.message);
      form.reset();
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative flex items-center w-full h-full gap-6"
      >
        <div className="flex flex-col w-full">
          <FormField
            control={form.control}
            name="location"
            render={({ field: { onChange } }) => (
              <FormItem>
                <FormLabel className="text-sm">{QuestionFormFields[0].label}</FormLabel>
                <FormControl>
                  <LocationSelectDrawer onChange={onChange} />
                </FormControl>
                <div className="h-4">
                  <FormMessage className="text-xs text-red" />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">{QuestionFormFields[1].label}</FormLabel>
                <FormControl>
                  <Input
                    type={QuestionFormFields[1].type}
                    placeholder={QuestionFormFields[1].placeholder}
                    {...field}
                    className="text-xs"
                  />
                </FormControl>
                <div className="h-4">
                  <FormMessage className="text-xs text-red" />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">{QuestionFormFields[2].label}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={QuestionFormFields[2].placeholder}
                    {...field}
                    className="text-xs"
                  />
                </FormControl>
                <div className="h-4">
                  <FormMessage className="text-xs text-red" />
                </div>
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            <Button
              disabled={isPending || !form.formState.isValid}
              type="submit"
              className="w-full px-4 py-1 text-base text-white rounded-md"
            >
              물어보기
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
