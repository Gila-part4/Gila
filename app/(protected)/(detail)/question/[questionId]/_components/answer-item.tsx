'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState } from 'react';
import AnswerEditForm from '@/app/(protected)/(detail)/question/[questionId]/_components/answer-edit-form';
import { AnswerWithUser } from '@/type';
import calculateDate from '@/utils/calculateData';
import Image from 'next/image';
import { deleteAnswer } from '@/app/action/answer';
import { toast } from 'sonner';
import AnswerKebab from './answer-kebab';

interface Props {
  answer: AnswerWithUser;
  userId?: string;
}

export default function AnswerItem({ answer, userId }: Props) {
  const [isEdit, setIsEdit] = useState(false);
  const createaAt = calculateDate(answer.createdAt);

  const handleEditAnswer = () => {
    setIsEdit(!isEdit);
  };

  const isDeleteAnswer = async () => {
    const result = await deleteAnswer(answer.id);
    toast.success(result.message);
  };

  return (
    <div className="flex flex-col border rounded-md p-3 gap-2">
      <div className="flex items-center justify-between w-full h-9">
        <div className="flex items-center gap-2">
          <Avatar className="w-7 h-7">
            <AvatarImage
              src={answer.user.image || '/default-profile-image.png'}
              className="object-cover w-7 h-7 rounded-full"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="text-sm">{answer.user.nickname}</p>
          <p className="text-[10px] text-nowrap w-10 text-center text-gray_500">{`${createaAt.time}${createaAt.result}전`}</p>
        </div>
        {userId === answer.userId && !isEdit && (
          <AnswerKebab handleDelete={isDeleteAnswer} handleEdit={handleEditAnswer} />
        )}
      </div>
      <div className="flex flex-col gap-3">
        {answer.images[0] && !isEdit && (
          <div className="w-full h-72 relative">
            <Image
              src={answer.images[0]}
              alt="답변 이미지"
              fill
              className="rounded-md"
              objectFit="contain"
            />
          </div>
        )}
        {isEdit ? (
          <AnswerEditForm
            answerId={answer.id}
            defaultValue={answer}
            handleEditAnswer={handleEditAnswer}
          />
        ) : (
          <p className="text-sm w-full break-words min-h-10">{answer.content}</p>
        )}
      </div>
    </div>
  );
}
