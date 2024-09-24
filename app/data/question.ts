/* eslint-disable @typescript-eslint/no-explicit-any */

'use server';

import db from '@/lib/db';
import { QuestionWithUserAndAnswers } from '@/type';
import { getSessionUserData } from '@/app/data/user';

export const getQuestions = async ({
  order = 'recent',
  location,
  take = 10,
  answerTake = 10,
  cursor,
}: {
  order: 'answerLen' | 'recent';
  location?: string;
  take?: number;
  answerTake?: number;
  cursor?: string | null;
}): Promise<{ questions: QuestionWithUserAndAnswers[]; cursorId: string | null }> => {
  try {
    const baseInclude = {
      answers: {
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
        take: answerTake,
        orderBy: {
          createdAt: 'desc' as const,
        },
      },
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
          answers: true,
        },
      },
    };

    const questions = await db.question.findMany({
      where: location ? { location } : {},
      include: baseInclude,
      take,
      cursor: cursor ? { id: cursor } : undefined,
      skip: cursor ? 1 : 0,
      orderBy:
        order === 'recent'
          ? { createdAt: 'desc' as const }
          : [{ answers: { _count: 'desc' as const } }, { createdAt: 'desc' as const }],
    });

    const lastQuestion = questions[questions.length - 1];
    const newCursorId = lastQuestion ? lastQuestion.id : null;

    const questionsWithAnswerCursorId = questions.map((question) => {
      const lastAnswer = question.answers[question.answers.length - 1];
      return {
        ...question,
        answerCursorId: lastAnswer ? lastAnswer.id : null,
      };
    });

    return { questions: questionsWithAnswerCursorId, cursorId: newCursorId };
  } catch (error) {
    throw new Error('질문 요청을 가져오는 중에 에러가 발생하였습니다.');
  }
};
export const getMyQuestions = async ({
  take = 10,
  answerTake = 10,
  cursor,
}: {
  take?: number;
  answerTake?: number;
  cursor?: string;
}): Promise<{ questions: QuestionWithUserAndAnswers[]; cursorId: string | null }> => {
  const session = await getSessionUserData();
  if (!session) throw new Error('인증이 필요합니다.');

  const questions = await db.question.findMany({
    where: {
      userId: session.id,
    },
    include: {
      answers: {
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
        take: answerTake,
        orderBy: {
          createdAt: 'desc',
        },
      },
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
          answers: true,
        },
      },
    },
    take,
    cursor: cursor ? { id: cursor } : undefined,
    skip: cursor ? 1 : 0,
    orderBy: { createdAt: 'desc' },
  });

  const lastQuestion = questions[questions.length - 1];
  const newCursorId = lastQuestion ? lastQuestion.id : null;

  const questionsWithAnswerCursorId = questions.map((question) => {
    const lastAnswer = question.answers[question.answers.length - 1];
    return {
      ...question,
      answerCursorId: lastAnswer ? lastAnswer.id : null,
    };
  });

  return { questions: questionsWithAnswerCursorId, cursorId: newCursorId };
};

export const getQuestionById = async ({
  questionId,
  answerTake = 10,
}: {
  questionId: string;
  answerTake?: number;
}): Promise<QuestionWithUserAndAnswers | null> => {
  try {
    const question = await db.question.findUnique({
      where: {
        id: questionId,
      },
      include: {
        answers: {
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
          take: answerTake,
          orderBy: {
            createdAt: 'desc',
          },
        },
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
            answers: true,
          },
        },
      },
    });

    if (!question) {
      throw new Error('질문을 찾을 수 없습니다.');
    }

    const lastAnswer = question.answers[question.answers.length - 1];
    const answerCursorId = lastAnswer ? lastAnswer.id : null;

    const questionWithAnswerCursorId = {
      ...question,
      answerCursorId,
    };

    return questionWithAnswerCursorId;
  } catch (error) {
    throw new Error('질문을 가져오는 중에 에러가 발생했습니다.');
  }
};
