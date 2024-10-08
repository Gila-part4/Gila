'use client';

import { Edit2 } from 'lucide-react';
import { useState, useTransition } from 'react';
import RenderAvatar from '@/app/(protected)/(user)/profile/edit/_components/render-avatar';
import { Button } from '@/components/ui/button';
import { editImage } from '@/app/action/user';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import UploadButton from '@/components/upload-button';

type Props = {
  userImg?: string;
};

export default function EditImageForm({ userImg }: Props) {
  const [imageUrl, setImageUrl] = useState(userImg);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const onChange = (url?: string) => {
    if (!url) return;
    setImageUrl(url);
    setLoading(false);
  };

  const onUploadBegin = () => {
    setLoading(true);
  };

  const onCancel = () => {
    setImageUrl(userImg);
    setLoading(false);
  };

  const onEdit = () => {
    if (!imageUrl) {
      toast.error('이미지를 선택해 주세요.');
      return;
    }
    startTransition(async () => {
      const action = await editImage(imageUrl);
      if (!action.success) {
        toast.error(action.message);
        return;
      }
      toast.success(action.message);
      router.refresh();
    });
  };

  const customButton = () => {
    return (
      <div className="z-10 p-3 rounded-full bg-primary">
        <Edit2 className="w-4 h-4" />
      </div>
    );
  };

  const showButtons = imageUrl !== userImg;

  return (
    <div className="relative">
      <RenderAvatar loading={loading} imageUrl={imageUrl} />
      <div className="absolute flex w-10 h-10 space-x-2 top-1 right-16">
        <UploadButton
          onChange={onChange}
          onUploadBegin={onUploadBegin}
          CustomButton={customButton}
        />
      </div>
      <div className="flex items-center justify-center h-12">
        {showButtons && (
          <div className="flex mt-4 gap-x-2">
            <Button
              disabled={isPending}
              className="font-bold text-white bg-red hover:bg-rose-800"
              onClick={onCancel}
            >
              취소
            </Button>
            <Button
              disabled={isPending}
              onClick={onEdit}
              className="font-bold text-white bg-green hover:bg-lime-600"
            >
              확정
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
