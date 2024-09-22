'use server';

import { revalidatePath } from 'next/cache';
import db from '@/lib/db';
import { ActionType } from '@/type';
import { ActivityRequest } from '@prisma/client';
import { getSessionUserData } from '@/app/data/user';

export const createActivityRequest = async (
  activityId: string,
): Promise<ActionType<ActivityRequest>> => {
  const { id } = await getSessionUserData();
  try {
    const existingRequest = await db.activityRequest.findUnique({
      where: {
        requestUserId_activityId: {
          requestUserId: id,
          activityId,
        },
      },
    });

    if (existingRequest) {
      return { success: false, message: '이미 생성된 요청이 있습니다.' };
    }

    const myActivity = await db.activity.findUnique({
      where: {
        id: activityId,
      },
    });

    if (myActivity?.userId === id) {
      return { success: false, message: '본인의 활동은 신청할 수 없습니다.' };
    }

    const activityRequest = await db.activityRequest.create({
      data: {
        requestUserId: id,
        activityId,
      },
    });

    if (!activityRequest) return { success: false, message: '요청 생성에 실패하였습니다.' };

    revalidatePath('/dashboard/promise-list');

    return { success: true, message: '요청 생성에 성공하였습니다.' };
  } catch (error) {
    return { success: false, message: '요청 생성 중에 에러가 발생하였습니다.' };
  }
};

export const approveActivityRequest = async (
  requestId: string,
  activityId: string,
): Promise<ActionType<ActivityRequest>> => {
  try {
    const approvedRequest = await db.activity.findUnique({
      where: { id: activityId },
      include: {
        activityRequests: { where: { status: 'APPROVE' } },
      },
    });

    if (
      approvedRequest &&
      approvedRequest.activityRequests.length === approvedRequest.maximumCount
    ) {
      return { success: false, message: '최대 인원 이상 요청을 수락할 수 없습니다.' };
    }

    const activityRequest = await db.activityRequest.update({
      where: { id: requestId },
      data: { status: 'APPROVE' },
    });

    if (!activityRequest) return { success: false, message: '요청 승인에 실패하였습니다.' };

    revalidatePath('/dashboard/promised-list', 'page');

    return { success: true, message: '요청 승인에 성공하였습니다.' };
  } catch (error) {
    return { success: false, message: '요청 승인 중에 에러가 발생하였습니다.' };
  }
};

export const rejectActivityRequest = async (
  requestId: string,
): Promise<ActionType<ActivityRequest>> => {
  try {
    const activityRequest = await db.activityRequest.update({
      where: { id: requestId },
      data: { status: 'REJECT' },
    });

    if (!activityRequest) return { success: false, message: '요청 거절에 실패하였습니다.' };

    revalidatePath('/dashboard/promised-list', 'page');

    return { success: true, message: '요청 거절에 성공하였습니다.' };
  } catch (error) {
    return { success: false, message: '요청 거절 중에 에러가 발생하였습니다.' };
  }
};

export const deleteActivityRequest = async (
  requestId: string,
): Promise<ActionType<ActivityRequest>> => {
  try {
    const activityRequest = await db.activityRequest.delete({
      where: { id: requestId },
    });

    if (!activityRequest) return { success: false, message: '요청 삭제에 실패하였습니다.' };

    return { success: true, message: '요청 삭제에 성공하였습니다.' };
  } catch (error) {
    return { success: false, message: '요청 삭제 중에 에러가 발생하였습니다.' };
  }
};
