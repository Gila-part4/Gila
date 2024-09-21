'use server';

import { revalidatePath } from 'next/cache';
import { getSessionUserData } from '@/app/data/user';
import db from '@/lib/db';
import { RequestWithActivity, RequestWithReqUserAndActivity } from '@/type';

export const getMySentRequests = async ({
  cursor,
  take = 10,
}: {
  cursor?: string;
  take?: number;
}): Promise<{ validRequests: RequestWithActivity[]; cursorId: string | null }> => {
  const { id } = await getSessionUserData();
  const nowDate = new Date();
  try {
    const requests = await db.activityRequest.findMany({
      where: { requestUserId: id },
      include: {
        activity: true,
      },
      cursor: cursor ? { id: cursor } : undefined,
      skip: cursor ? 1 : 0,
      take,
      orderBy: {
        createdAt: 'desc',
      },
    });

    // eslint-disable-next-line prefer-const
    let validRequests = [];
    if (requests) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; requests.length > i; i++) {
        if (requests[i].activity.endDate > nowDate) {
          validRequests.push(requests[i]);
        }
      }
    }

    const lastActivityRequest = requests[requests.length - 1];
    const cursorId = lastActivityRequest ? lastActivityRequest.id : null;

    return { validRequests, cursorId };
  } catch (error) {
    throw new Error('활동 요청을 가져오는 중에 에러가 발생하였습니다.');
  }
};

export const getMyReceivedRequests = async ({
  cursor,
  take = 10,
}: {
  cursor?: string;
  take?: number;
}): Promise<{ requests: RequestWithReqUserAndActivity[]; cursorId: string | null }> => {
  try {
    const { id } = await getSessionUserData();
    const nowDate = new Date();

    const userActivities = await db.activity.findMany({
      where: { userId: id, endDate: { gte: nowDate } },
      select: {
        activityRequests: {
          where: {
            status: 'PENDING',
          },
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
          orderBy: {
            id: 'asc',
          },
          ...(cursor && { cursor: { id: cursor } }),
          skip: cursor ? 1 : 0,
          take,
        },
      },
    });

    const requests = userActivities.flatMap((activity) => activity.activityRequests);

    const lastRequest = requests[requests.length - 1];
    const cursorId = lastRequest ? lastRequest.id : null;

    revalidatePath('/dashboard/promised-list');

    return { requests, cursorId };
  } catch (error) {
    throw new Error('신청한 활동을 가져오는 중에 에러가 발생했습니다.');
  }
};
