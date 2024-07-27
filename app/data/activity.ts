'use server';

import { Activity, User } from '@prisma/client';
import { getCurrentUser, getCurrentUserId } from '@/app/data/user';
import { db } from '@/lib/db';
import { ActivityWithUser } from '@/type';

export const getMyActivities = async ({
  cursor,
  take = 10,
}: {
  cursor?: string;
  take?: number;
}): Promise<{
  activities: Activity[];
  cursorId: string | null;
}> => {
  try {
    const userId = await getCurrentUserId();

    const myActivities = await db.activity.findMany({
      where: { userId },
      take,
      cursor: cursor ? { id: cursor } : undefined,
      skip: cursor ? 1 : 0,
      orderBy: {
        id: 'asc',
      },
    });

    const lastActivity = myActivities[myActivities.length - 1];
    const cursorId = lastActivity ? lastActivity.id : null;

    return { activities: myActivities, cursorId };
  } catch (error) {
    throw new Error('활동을 가져오는 중에 에러가 발생하였습니다.');
  }
};

export const getActivities = async ({
  type = 'recent',
  location,
  size = 10,
  cursor,
}: {
  type: 'recent' | 'mostFavorite' | 'tag' | 'mostViewed';
  location?: string;
  size?: number;
  cursor?: string;
}): Promise<{ activities: ActivityWithUser[]; cursorId: string | null }> => {
  try {
    const currentUser = await getCurrentUser();
    let activities;

    const commonWhereClause = location ? { location } : {};

    switch (type) {
      case 'recent':
        activities = await db.activity.findMany({
          where: commonWhereClause,
          take: size,
          cursor: cursor ? { id: cursor } : undefined,
          skip: cursor ? 1 : 0,
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            user: true,
          },
        });
        break;

      case 'mostFavorite':
        activities = await db.activity.findMany({
          where: commonWhereClause,
          take: size,
          cursor: cursor ? { id: cursor } : undefined,
          skip: cursor ? 1 : 0,
          orderBy: {
            favorites: {
              _count: 'desc',
            },
          },
          include: {
            user: true,
          },
        });
        break;

      case 'tag':
        if (!currentUser || !currentUser.tags) {
          throw new Error('현재 유저가 존재하지 않습니다.');
        }

        activities = await db.activity.findMany({
          where: {
            ...commonWhereClause,
            tags: {
              hasSome: currentUser.tags,
            },
          },
          take: size,
          cursor: cursor ? { id: cursor } : undefined,
          skip: cursor ? 1 : 0,
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            user: true,
          },
        });

        break;

      case 'mostViewed':
        activities = await db.activity.findMany({
          where: commonWhereClause,
          take: size,
          cursor: cursor ? { id: cursor } : undefined,
          skip: cursor ? 1 : 0,
          orderBy: {
            views: 'desc',
          },
          include: {
            user: true,
          },
        });
        break;

      default:
        throw new Error('입력값을 잘못 입력 하였습니다.');
    }

    const cursorId = activities.length > 0 ? activities[activities.length - 1].id : null;

    return {
      activities,
      cursorId,
    };
  } catch (error) {
    throw new Error('활동을 가져오는 중에 에러가 발생하였습니다.');
  }
};

export const getActivityById = async (id: string): Promise<ActivityWithUser> => {
  try {
    const activity = await db.activity.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!activity) {
      throw new Error('활동을 찾을 수 없습니다.');
    }

    return activity;
  } catch (error) {
    throw new Error('활동을 가져오는 중에 에러가 발생하였습니다.');
  }
};
