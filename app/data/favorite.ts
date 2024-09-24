'use server';

import { getSessionUserData } from '@/app/data/user';
import db from '@/lib/db';
import { FavoriteWithActivity } from '@/type';

const getMyFavorites = async ({
  cursor,
  take = 10,
}: {
  cursor?: string;
  take?: number;
}): Promise<{ favorites: FavoriteWithActivity[]; cursorId: string | null }> => {
  const session = await getSessionUserData();
  if (!session) throw new Error('인증이 필요합니다.');
  try {
    const favorites = await db.favorite.findMany({
      where: { userId: session.id },
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
};

export default getMyFavorites;
