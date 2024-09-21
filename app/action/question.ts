'use server';

import { ActionType } from '@/type';
import { Question } from '@prisma/client';
import { getSessionUserData } from '@/app/data/user';
import db from '@/lib/db';
import { revalidatePath } from 'next/cache';

export const createQuestion = async ({
  title,
  content,
  location,
}: {
  title: string;
  content: string;
  location: string;
}): Promise<ActionType<Question>> => {
  const { id } = await getSessionUserData();
  try {
    const question = await db.question.create({
      data: {
        userId: id,
        title,
        content,
        location,
      },
    });

    if (!question) return { success: false, message: '질문 생성에 실패하였습니다.' };

    revalidatePath('/question-list', 'page');

    return {
      success: true,
      message: '질문 생성에 성공하였습니다.',
      data: question,
    };
  } catch (error) {
    return {
      success: false,
      message: '질문 생성 중에 에러가 발생하였습니다.',
    };
  }
};

export const editQuestion = async ({
  requestId,
  title,
  content,
  location,
}: {
  requestId: string;
  title: string;
  content: string;
  location: string;
}): Promise<ActionType<Question>> => {
  try {
    const question = await db.question.update({
      where: { id: requestId },
      data: {
        title,
        content,
        location,
      },
    });

    if (!question) return { success: false, message: '질문 수정에 실패하였습니다.' };

    revalidatePath('/dashboard/my-question', 'page');

    return {
      success: true,
      message: '질문 수정에 성공하였습니다.',
      data: question,
    };
  } catch (error) {
    return {
      success: false,
      message: '질문 수정 중에 에러가 발생하였습니다.',
    };
  }
};

export const deleteQuestion = async (requestId: string): Promise<ActionType<Question>> => {
  try {
    const question = await db.question.delete({
      where: { id: requestId },
    });

    if (!question) return { success: false, message: '질문 삭제에 실패하였습니다.' };

    revalidatePath('/dashboard/my-question', 'page');

    return { success: true, message: '질문 삭제에 성공하였습니다.' };
  } catch (error) {
    return {
      success: false,
      message: '질문 삭제 중에 에러가 발생하였습니다.',
    };
  }
};
