'use server';

import { getCurrentUser, getSessionUserData } from '@/app/data/user';
import db from '@/lib/db';
import {
  ActivityWithUser,
  ActivityWithUserAndFavoCount,
  ActivityWithFavoriteAndCount,
  ActivityWithRequest,
} from '@/type';
import { RequestStatus } from '@prisma/client';

export const getMyActivities = async ({
  cursor,
  take = 10,
}: {
  cursor?: string;
  take?: number;
}): Promise<{ activities: ActivityWithFavoriteAndCount[]; cursorId: string | null }> => {
  const { id } = await getSessionUserData();

  try {
    const myActivities = await db.activity.findMany({
      where: { userId: id },
      include: {
        _count: {
          select: { favorites: true },
        },
        favorites: {
          where: {
            id,
          },
          select: {
            id: true,
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

    const lastActivity = myActivities[myActivities.length - 1];
    const cursorId = lastActivity ? lastActivity.id : null;

    // Map over activities and add `isFavo` property
    const activitiesWithFavo = myActivities.map((activity) => {
      const isFavorite = activity.favorites.length > 0;
      return { ...activity, isFavorite };
    });

    return { activities: activitiesWithFavo, cursorId };
  } catch (error) {
    throw new Error('활동을 가져오는 중에 에러가 발생하였습니다.');
  }
};

export const getActivities = async ({
  type = 'recent',
  location,
  size = 5,
  cursor,
}: {
  type: 'recent' | 'mostFavorite' | 'tag' | 'mostViewed';
  location?: string;
  size?: number;
  cursor?: string;
}): Promise<{ activities: ActivityWithUserAndFavoCount[]; cursorId: string | null }> => {
  try {
    const currentUser = await getCurrentUser();
    let activities;

    const baseQuery = {
      take: size,
      cursor: cursor ? { id: cursor } : undefined,
      skip: cursor ? 1 : 0,
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
        _count: {
          select: {
            favorites: true,
          },
        },
      },
    };

    switch (type) {
      case 'recent':
        activities = await db.activity.findMany({
          ...baseQuery,
          where: location ? { location } : {},
          orderBy: {
            createdAt: 'desc',
          },
        });
        break;

      case 'mostFavorite':
        activities = await db.activity.findMany({
          ...baseQuery,
          where: location ? { location } : {},
          orderBy: [
            {
              favorites: {
                _count: 'desc',
              },
            },
            {
              createdAt: 'desc',
            },
          ],
        });
        break;

      case 'tag':
        if (!currentUser || !currentUser.tags) {
          throw new Error('현재 유저가 존재하지 않습니다.');
        }

        activities = await db.activity.findMany({
          ...baseQuery,
          where: location
            ? {
                location,
                tags: {
                  hasSome: currentUser.tags,
                },
              }
            : {
                tags: {
                  hasSome: currentUser.tags,
                },
              },
          orderBy: {
            createdAt: 'desc',
          },
        });
        break;

      case 'mostViewed':
        activities = await db.activity.findMany({
          ...baseQuery,
          where: location ? { location } : {},
          orderBy: [
            {
              views: 'desc',
            },
            {
              createdAt: 'desc',
            },
          ],
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

export const getActivityById = async (activityId: string): Promise<ActivityWithRequest> => {
  const { id } = await getSessionUserData();
  try {
    const activity = await db.activity.findUnique({
      where: { id: activityId },
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
        favorites: {
          where: {
            userId: id,
          },
          select: {
            id: true,
          },
        },
        _count: {
          select: {
            favorites: true,
          },
        },
        activityRequests: { where: { requestUserId: id } },
      },
    });

    if (!activity) {
      throw new Error('활동을 찾을 수 없습니다.');
    }

    return {
      ...activity,
      isFavorite: activity.favorites.length > 0,
    };
  } catch (error) {
    throw new Error('활동을 가져오는 중에 에러가 발생하였습니다.');
  }
};

export const getAvailableReviewActivities = async ({
  cursor,
  take = 10,
}: {
  cursor?: string;
  take?: number;
}): Promise<{
  activities: ActivityWithUser[];
  cursorId: string | null;
}> => {
  const { id } = await getSessionUserData();
  try {
    const currentDate = new Date();

    const activities = await db.activity.findMany({
      where: {
        endDate: {
          lt: currentDate,
        },
        activityRequests: {
          some: {
            requestUserId: id,
            status: RequestStatus.APPROVE,
          },
        },
        reviews: {
          none: {
            userId: id,
          },
        },
      },
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
      },
      take,
      cursor: cursor ? { id: cursor } : undefined,
      skip: cursor ? 1 : 0,
      orderBy: {
        createdAt: 'asc',
      },
    });

    const lastActivity = activities[activities.length - 1];
    const cursorId = lastActivity ? lastActivity.id : null;

    return { activities, cursorId };
  } catch (error) {
    throw new Error('리뷰를 가져오는 중에 에러가 발생하였습니다.');
  }
};

export const getActivitiesByLocation = async ({
  location,
  secondeLocation,
  size = 5,
}: {
  location: string;
  secondeLocation?: string;
  size?: number;
}): Promise<{ activities: ActivityWithUserAndFavoCount[] }> => {
  try {
    let activities: ActivityWithUserAndFavoCount[];
    const baseQuery = {
      take: size,
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
        _count: {
          select: {
            favorites: true,
          },
        },
      },
    };

    const firstactivities = await db.activity.findMany({
      ...baseQuery,
      where: { location },
      orderBy: {
        createdAt: 'desc',
      },
    });

    activities = [...firstactivities];

    if (secondeLocation) {
      const secondeActivities = await db.activity.findMany({
        ...baseQuery,
        where: { location: secondeLocation },
        orderBy: {
          createdAt: 'desc',
        },
      });
      activities = [...activities, ...secondeActivities];
    }

    return {
      activities,
    };
  } catch (error) {
    throw new Error('활동을 가져오는 중에 에러가 발생하였습니다.');
  }
};
