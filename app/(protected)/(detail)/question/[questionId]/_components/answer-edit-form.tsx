'use client';

import { editAnswer } from '@/app/action/answer';
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
import { EditFormFields } from '@/constants/form-schema';
import { AnswerWithUser } from '@/type';
import { zodResolver } from '@hookform/resolvers/zod';
import { FileImage, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface Props {
  defaultValue: AnswerWithUser;
  answerId: string;
  handleEditAnswer: () => void;
}

const FormSchema = z.object({
  content: z
    .string()
    .min(1, { message: '답변은 최소 1자 이상 입력해 주세요.' })
    .max(200, { message: '답변은 200자 이내로 입력해 주세요.' }),
});

export default function AnswerEditForm({ answerId, defaultValue, handleEditAnswer }: Props) {
  const [defaultImage, setDefaultImage] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      content: defaultValue.content,
    },
  });

  const uploadImage = (url?: string) => {
    if (!url) return;
    setDefaultImage([url]);
    setLoading(false);
  };

  const cancelImage = () => {
    setDefaultImage([]);
  };

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    startTransition(async () => {
      const result = await editAnswer({ answerId, content: values.content, images: defaultImage });
      if (!result.success) {
        toast.error(result.message);
        return;
      }
      toast.success(result.message);
      form.setValue('content', '');
      handleEditAnswer();
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

  useEffect(() => {
    if (defaultValue.images[0]) setDefaultImage([defaultValue.images[0]]);
  }, [defaultValue.images]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-end w-full gap-2">
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

                <FormLabel className="text-sm">{EditFormFields.label}</FormLabel>
                {loading && (
                  <div className="flex items-center justify-center">
                    <Spinner />
                  </div>
                )}
                {defaultImage[0] && (
                  <div className="relative w-full h-72">
                    <Image
                      src={defaultImage[0]}
                      alt="답변 이미지"
                      fill
                      className="rounded-md"
                      objectFit="contain"
                    />
                    <X className="absolute right-1 top-1" onClick={cancelImage} />
                  </div>
                )}
                <FormControl>
                  <Textarea
                    placeholder={EditFormFields.placeholder}
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
        <div className="flex gap-3">
          <Button
            type="button"
            className="h-8 px-4 py-1 text-sm text-white rounded-md"
            onClick={handleEditAnswer}
          >
            취소
          </Button>
          <Button
            disabled={isPending || loading || !form.formState.isValid}
            type="submit"
            className="h-8 px-4 py-1 text-sm text-white rounded-md"
          >
            수정하기
          </Button>
        </div>
      </form>
    </Form>
  );
}
