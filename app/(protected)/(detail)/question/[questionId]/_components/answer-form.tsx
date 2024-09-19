'use client';

import { createAnswer } from '@/app/action/answer';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import Spinner from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import UploadButton from '@/components/upload-button';
import { AnswerFormFields } from '@/constants/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FileImage, X } from 'lucide-react';
import Image from 'next/image';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const FormSchema = z.object({
  content: z
    .string()
    .min(1, { message: '답변은 최소 1자 이상 입력해 주세요.' })
    .max(200, { message: '답변은 200자 이내로 입력해 주세요.' }),
});

export default function AnswerForm({ questionId }: { questionId: string }) {
  const [imageUrl, setImageUrl] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      content: '',
    },
  });

  const uploadImage = (url?: string) => {
    if (!url) return;
    setImageUrl([url]);
    setLoading(false);
  };

  const cancelImage = () => {
    setImageUrl([]);
  };

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    startTransition(async () => {
      const result = await createAnswer({ questionId, content: values.content, images: imageUrl });
      if (!result.success) {
        toast.error(result.message);
        return;
      }
      toast.success(result.message);
      form.setValue('content', '');
      setImageUrl([]);
    });
  };

  const customButton = () => {
    return (
      <div className="relative z-10">
        <div className="flex items-center justify-center gap-1 p-1 rounded-md">
          <FileImage className="w-5 h-5" color="#000" />
        </div>
      </div>
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-end w-full gap-2 p-2 pt-2 border rounded-lg"
      >
        <div className="flex flex-col w-full">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="relative">
                <div className="absolute right-0 -top-1 ">
                  <UploadButton
                    onChange={uploadImage}
                    onUploadBegin={() => setLoading(true)}
                    CustomButton={customButton}
                  />
                </div>
                <FormLabel className="pl-1 text-sm">{AnswerFormFields.label}</FormLabel>
                {loading && (
                  <div className="flex items-center justify-center">
                    <Spinner />
                  </div>
                )}
                {imageUrl[0] && (
                  <div className="relative w-52 h-60">
                    <Image
                      src={imageUrl[0]}
                      fill
                      alt="답변 이미지"
                      className="object-cover rounded-lg"
                    />
                    <X className="absolute right-1 top-1" onClick={cancelImage} />
                  </div>
                )}
                <FormControl>
                  <Textarea
                    placeholder={AnswerFormFields.placeholder}
                    {...field}
                    className="text-xs"
                  />
                </FormControl>
                <div className="absolute -bottom-6">
                  <FormMessage className="text-xs text-red" />
                </div>
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center justify-center">
          <Button
            disabled={isPending || loading || !form.formState.isValid}
            type="submit"
            className="h-8 px-4 py-1 text-sm text-white rounded-md"
          >
            제출하기
          </Button>
        </div>
      </form>
    </Form>
  );
}
