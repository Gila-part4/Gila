'use server';

import db from '@/lib/db';
import { AnswerWithUser } from '@/type';
import { cache } from 'react';

const getAnswers = cache(
  async ({
    questionId,
    cursor,
    take = 10,
  }: {
    questionId: string;
    cursor: string | null;
    take?: number;
  }): Promise<{ answers: AnswerWithUser[]; cursorId: string | null }> => {
    try {
      const answers = await db.answer.findMany({
        where: { questionId },
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
        cursor: cursor ? { id: cursor } : undefined,
        skip: cursor ? 1 : 0,
        take,
        orderBy: {
          createdAt: 'desc',
        },
      });

      const lastAnswer = answers[answers.length - 1];
      const cursorId = lastAnswer ? lastAnswer.id : null;

      return { answers, cursorId };
    } catch (error) {
      throw new Error('답변을 가져오는 중에 에러가 발생하였습니다.');
    }
  },
);

export default getAnswers;
