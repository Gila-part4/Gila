'use server';

import { cookies } from 'next/headers';
import db from '@/lib/db';
import { ActionType } from '@/type';
import { Activity } from '@prisma/client';
import { getSessionUserData } from '@/app/data/user';
import { revalidatePath } from 'next/cache';

export const createActivity = async ({
  title,
  description,
  thumbnails,
  tags,
  startDate,
  endDate,
  location,
  maximumCount,
}: {
  title: string;
  description: string;
  thumbnails: string[];
  tags: string[];
  startDate: Date;
  endDate: Date;
  location: string;
  maximumCount: number;
}): Promise<ActionType<Activity>> => {
  try {
    const session = await getSessionUserData();
    if (!session) throw new Error('인증이 필요합니다.');

    const newActivity = await db.activity.create({
      data: {
        userId: session.id,
        title,
        description,
        startDate,
        endDate,
        maximumCount,
        thumbnails,
        tags,
        location,
      },
    });

    if (!newActivity) return { success: false, message: '활동 생성에 실패하였습니다.' };

    revalidatePath('/dashboard/my-activity', 'page');
    revalidatePath('/activity-list', 'page');

    return {
      success: true,
      message: '활동 생성에 성공하였습니다.',
      data: newActivity,
    };
  } catch (error) {
    return { success: false, message: '활동 생성 중에 에러가 발생하였습니다.' };
  }
};

export const editActivity = async ({
  activityId,
  title,
  description,
  thumbnails,
  tags,
  startDate,
  endDate,
  location,
  maximumCount,
}: {
  activityId: string;
  title: string;
  description: string;
  thumbnails: string[];
  tags: string[];
  startDate: Date;
  endDate: Date;
  location: string;
  maximumCount: number;
}): Promise<ActionType<Activity>> => {
  const session = await getSessionUserData();
  if (!session) throw new Error('인증이 필요합니다.');

  try {
    const updatedActivity = await db.activity.update({
      where: { id: activityId },
      data: {
        userId: session.id,
        title,
        description,
        startDate,
        endDate,
        maximumCount,
        thumbnails,
        tags,
        location,
      },
    });

    if (!updatedActivity) return { success: false, message: '활동 수정에 실패하였습니다.' };

    return {
      success: true,
      message: '활동 수정에 성공하였습니다.',
      data: updatedActivity,
    };
  } catch (error) {
    return { success: false, message: '활동 수정 중에 에러가 발생하였습니다.' };
  }
};
export const deleteActivity = async (activityId: string): Promise<ActionType<Activity>> => {
  try {
    const deletedActivity = await db.activity.delete({
      where: { id: activityId },
    });

    if (!deletedActivity) return { success: false, message: '활동 삭제에 실패하였습니다.' };

    return { success: true, message: '활동 삭제에 성공하였습니다.' };
  } catch (error) {
    return { success: false, message: '활동 삭제 중에 에러가 발생하였습니다.' };
  }
};

export const increaseActivityCount = async (activityId: string): Promise<ActionType<null>> => {
  try {
    const cookieStore = cookies();
    const viewCookie = cookieStore.get(`viewed_${activityId}`);

    if (viewCookie) {
      return { success: false, message: '이미 조회수를 올린 유저입니다.' };
    }

    await db.activity.update({
      where: { id: activityId },
      data: { views: { increment: 1 } },
    });

    cookies().set(`viewed_${activityId}`, 'true', { maxAge: 30 * 60 });

    return { success: true, message: '조회수 증가' };
  } catch (error) {
    return { success: false, message: '에러 발생' };
  }
};
