'use server';

import { getCurrentUserId } from '@/app/data/user';
import db from '@/lib/db';
import { FavoriteWithActivity } from '@/type';
import { cache } from 'react';

const getMyFavorites = cache(
  async ({
    cursor,
    take = 10,
  }: {
    cursor?: string;
    take?: number;
  }): Promise<{ favorites: FavoriteWithActivity[]; cursorId: string | null }> => {
    const userId = await getCurrentUserId();
    try {
      const favorites = await db.favorite.findMany({
        where: { userId },
        include: {
          activity: true,
        },
        cursor: cursor ? { id: cursor } : undefined,
        skip: cursor ? 1 : 0,
        take,
        orderBy: {
          createdAt: 'asc',
        },
      });

      const lastFavorite = favorites[favorites.length - 1];
      const cursorId = lastFavorite ? lastFavorite.id : null;

      return { favorites, cursorId };
    } catch (error) {
      throw new Error('좋아요 목록을 가져오는 중에 에러가 발생하였습니다.');
    }
  },
);

export default getMyFavorites;
