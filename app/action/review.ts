'use server';

import db from '@/lib/db';
import { ActionType } from '@/type';
import { Review } from '@prisma/client';
import { getSessionUserData } from '@/app/data/user';
import { revalidatePath } from 'next/cache';

const createReview = async ({
  activityId,
  rating,
}: {
  activityId: string;
  rating: number;
}): Promise<ActionType<Review>> => {
  if (rating > 100) {
    return { success: false, message: '점수는 100을 초과할 수 없습니다.' };
  }

  const session = await getSessionUserData();
  if (!session) throw new Error('인증이 필요합니다.');

  try {
    const existingReview = await db.review.findUnique({
      where: {
        userId_activityId: {
          userId: session.id,
          activityId,
        },
      },
    });

    if (existingReview) {
      return { success: false, message: '이미 이 활동에 대한 리뷰를 남기셨습니다.' };
    }

    const newReview = await db.review.create({
      data: {
        userId: session.id,
        rating,
        activityId,
      },
    });

    if (!newReview) return { success: false, message: '리뷰 생성에 실패하였습니다.' };

    revalidatePath('/dashboard/reviews', 'page');
    return {
      success: true,
      message: '리뷰 생성에 성공하였습니다.',
      data: newReview,
    };
  } catch (error) {
    return { success: false, message: '리뷰 생성 중에 에러가 발생하였습니다.' };
  }
};

export default createReview;
