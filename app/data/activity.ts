'use server';

import { getCurrentUser, getCurrentUserId } from '@/app/data/user';
import db from '@/lib/db';
import {
  ActivityWithUser,
  ActivityWithUserAndFavoCount,
  ActivityWithUserAndFavorite,
  ActivityWithFavoriteAndCount,
} from '@/type';
import { RequestStatus } from '@prisma/client';

export const getMyActivities = async ({
  cursor,
  take = 10,
}: {
  cursor?: string;
  take?: number;
}): Promise<{ activities: ActivityWithFavoriteAndCount[]; cursorId: string | null }> => {
  const userId = await getCurrentUserId();
  try {
    const myActivities = await db.activity.findMany({
      where: { userId },
      include: {
        _count: {
          select: { favorites: true },
        },
        favorites: {
          where: {
            userId,
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
        createdAt: 'asc',
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

        if (location && activities.length < size) {
          const remainingSize = size - activities.length;
          const additionalActivities = await db.activity.findMany({
            ...baseQuery,
            where: {
              location: { not: location },
            },
            take: remainingSize,
            orderBy: {
              createdAt: 'desc',
            },
          });
          activities = [...activities, ...additionalActivities];
        }
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

        if (location && activities.length < size) {
          const remainingSize = size - activities.length;
          const additionalActivities = await db.activity.findMany({
            ...baseQuery,
            where: {
              location: { not: location },
            },
            take: remainingSize,
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
          activities = [...activities, ...additionalActivities];
        }
        break;

      case 'tag':
        if (!currentUser || !currentUser.tags) {
          throw new Error('현재 유저가 존재하지 않습니다.');
        }

        activities = await db.activity.findMany({
          ...baseQuery,
          where: {
            location,
            tags: {
              hasSome: currentUser.tags,
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        });

        if (location && activities.length < size) {
          const remainingSize = size - activities.length;
          const additionalActivities = await db.activity.findMany({
            ...baseQuery,
            where: {
              location: { not: location },
              tags: {
                hasSome: currentUser.tags,
              },
            },
            take: remainingSize,
            orderBy: {
              createdAt: 'desc',
            },
          });
          activities = [...activities, ...additionalActivities];
        }
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

        if (location && activities.length < size) {
          const remainingSize = size - activities.length;
          const additionalActivities = await db.activity.findMany({
            ...baseQuery,
            where: {
              location: { not: location },
            },
            take: remainingSize,
            orderBy: [
              {
                views: 'desc',
              },
              {
                createdAt: 'desc',
              },
            ],
          });
          activities = [...activities, ...additionalActivities];
        }
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

export const getActivityById = async (id: string): Promise<ActivityWithUserAndFavorite> => {
  const userId = await getCurrentUserId();
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
        favorites: {
          where: {
            userId,
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
  const userId = await getCurrentUserId();
  try {
    const currentDate = new Date();

    const activities = await db.activity.findMany({
      where: {
        endDate: {
          lt: currentDate,
        },
        activityRequests: {
          some: {
            requestUserId: userId,
            status: RequestStatus.APPROVE,
          },
        },
        reviews: {
          none: {
            userId,
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
  size = 5,
  cursor,
}: {
  location: string;
  size?: number;
  cursor?: string;
}): Promise<{ activities: ActivityWithUserAndFavoCount[]; cursorId: string | null }> => {
  try {
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

    const activities = await db.activity.findMany({
      ...baseQuery,
      where: { location },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const cursorId = activities.length > 0 ? activities[activities.length - 1].id : null;

    return {
      activities,
      cursorId,
    };
  } catch (error) {
    throw new Error('활동을 가져오는 중에 에러가 발생하였습니다.');
  }
};
