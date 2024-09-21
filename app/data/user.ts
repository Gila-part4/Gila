/* eslint-disable no-underscore-dangle */
import { auth } from '@/auth';
import db from '@/lib/db';
import { User } from '@/type';

export const getSessionUserData = async () => {
  const session = await auth();
  try {
    if (!session) throw new Error('현재 로그인되어있지 않습니다.');
    if (!session.user) throw new Error('유저 데이터가 없습니다.');
    const { email, name, id, image } = session.user;
    if (!email) throw new Error('존재하지 않는 이메일 입니다.');
    if (!name) throw new Error('존재하지 않는 이름 입니다.');
    if (!id) throw new Error('존재하지 않는 id 입니다.');
    if (!image) throw new Error('이미지가 존재하지 않습니다.');

    return { email, name, id, image };
  } catch (error) {
    throw new Error('이메일을 가져오는중에 에러가 발생하였습니다.');
  }
};

export const getCurrentUser = async (): Promise<User> => {
  const { email } = await getSessionUserData();
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        nickname: true,
        image: true,
        tags: true,
        createdAt: true,
      },
    });

    if (!user) throw new Error('유저 정보가 존재하지 않습니다.');

    return user;
  } catch (error) {
    throw new Error('유저 정보를 가져오는중에 에러가 발생하였습니다.');
  }
};

export const getUserProfileWithIntroducedInfos = async (
  userId: string,
): Promise<{
  user: User;
  averageReviewScore: number;
  totalReviewCount: number;
  activityCount: number;
  questionCount: number;
}> => {
  try {
    const [user, reviewStats, activityCount, questionCount] = await db.$transaction([
      db.user.findUnique({
        where: { id: userId },
      }),
      db.review.aggregate({
        _avg: {
          rating: true,
        },
        _count: {
          id: true,
        },
        where: {
          userId,
        },
      }),
      db.activity.count({
        where: {
          userId,
        },
      }),
      db.question.count({
        where: {
          userId,
        },
      }),
    ]);

    if (!user) {
      throw new Error('유저를 찾을 수 없습니다.');
    }

    return {
      user,
      averageReviewScore: reviewStats._avg.rating || 0,
      totalReviewCount: reviewStats._count.id,
      activityCount,
      questionCount,
    };
  } catch (error) {
    throw new Error('유저 프로필 정보를 가져오는 중에 에러가 발생하였습니다.');
  }
};

export const getIsFirstLogin = async (): Promise<boolean> => {
  const { id } = await getSessionUserData();
  try {
    const user = await db.user.findUnique({
      where: { id },
    });
    if (!user) throw new Error('해당 유저 정보가 존재하지 않습니다.');

    const { isFirstLogin } = user;

    return isFirstLogin;
  } catch (error) {
    throw new Error('첫 로그인 여부를 가져오는 중에 에러가 발생하였습니다.');
  }
};
