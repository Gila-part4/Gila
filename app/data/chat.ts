'use server';

import { getSessionUserData } from '@/app/data/user';
import db from '@/lib/db';
import { ActivityWithUserAndRequest, ActivityWithUserandReqUser } from '@/type';

export const getMyChat = async ({
  cursor,
  take = 10,
}: {
  cursor?: string;
  take?: number;
}): Promise<{ activities: ActivityWithUserAndRequest[]; cursorId: string | null }> => {
  const { id } = await getSessionUserData();
  const nowDate = new Date();

  try {
    const myChat = await db.activity.findMany({
      where: { userId: id, endDate: { gte: nowDate } },
      include: {
        user: {
          select: {
            id: true,
            nickname: true,
            email: true,
            image: true,
            tags: true,
            createdAt: true,
          },
        },
        activityRequests: {
          where: {
            status: 'APPROVE',
          },
        },
      },
      take,
      cursor: cursor ? { id: cursor } : undefined,
      skip: cursor ? 1 : 0,
      orderBy: {
        createdAt: 'desc',
      },
    });

    const lastChat = myChat[myChat.length - 1];
    const cursorId = lastChat ? lastChat.id : null;

    return { activities: myChat, cursorId };
  } catch (error) {
    throw new Error('활동을 가져오는 중에 에러가 발생하였습니다.');
  }
};

export const getChannelById = async (id: string): Promise<ActivityWithUserandReqUser> => {
  try {
    const activity = await db.activity.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            nickname: true,
            email: true,
            image: true,
            tags: true,
            createdAt: true,
          },
        },
        activityRequests: {
          where: { status: 'APPROVE' },
          include: {
            requestUser: {
              select: {
                id: true,
                nickname: true,
                email: true,
                image: true,
                tags: true,
                createdAt: true,
              },
            },
            activity: true,
          },
        },
      },
    });

    if (!activity) {
      throw new Error('활동을 찾을 수 없습니다.');
    }

    return {
      ...activity,
    };
  } catch (error) {
    throw new Error('활동을 가져오는 중에 에러가 발생하였습니다.');
  }
};
