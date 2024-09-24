'use server';

import { signIn, signOut } from '@/auth';
import db from '@/lib/db';
import { hashPassword } from '@/lib/utils';
import { LoginSchema, RegisterSchema } from '@/schema';
import { ActionType, LoginSchemaType, RegisterSchemaType } from '@/type';
import { User } from '@prisma/client';
import { AuthError } from 'next-auth';
import { cookies } from 'next/headers';
import { getSessionUserData } from '@/app/data/user';

export const findUserByNickname = async (nickname: string): Promise<ActionType<User> | null> => {
  try {
    const user = await db.user.findFirst({
      where: {
        nickname,
      },
    });

    if (user) {
      return {
        success: false,
        message: '동일한 닉네임이 존재합니다.',
      };
    }
    return null;
  } catch (error) {
    return {
      success: false,
      message: '닉네임 중복 확인중 에러가 발생했습니다.',
    };
  }
};

export const register = async (form: RegisterSchemaType): Promise<ActionType<User>> => {
  try {
    const validate = RegisterSchema.safeParse(form);
    if (!validate.success) return { success: false, message: '올바른 값을 입력해 주세요.' };

    const { email, password, nickname } = validate.data;

    const checkNickName = await findUserByNickname(nickname);

    if (checkNickName) return { success: false, message: '이미 사용중인 닉네임입니다.' };

    const checkExistingUser = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (checkExistingUser) return { success: false, message: '이미 사용중인 이메일입니다.' };

    const hashedPassword = hashPassword(password);

    const createUser = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        nickname,
      },
    });

    return {
      success: true,
      message: '회원가입에 성공하였습니다.',
      data: createUser,
    };
  } catch (error) {
    return { success: false, message: '회원가입 중에 에러가 발생하였습니다.' };
  }
};

export const login = async (form: LoginSchemaType): Promise<ActionType<null>> => {
  try {
    const validate = LoginSchema.safeParse(form);
    if (!validate.success) return { success: false, message: '올바른 값을 입력해 주세요.' };

    const { email, password } = validate.data;

    await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    const user = await db.user.findUnique({
      where: { email },
    });
    if (!user) throw new Error('현재 유저가 존재하지 않습니다.');

    const { isFirstLogin } = user;

    if (isFirstLogin) {
      cookies().set('isFirstLogin', `${isFirstLogin}`);
    }

    return {
      success: true,
      message: '로그인에 성공하였습니다.',
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { success: false, message: '이메일이나 비밀번호가 일치하지 않습니다.' };
        default:
          return {
            success: false,
            message: '이메일이나 비밀번호가 일치하지 않습니다.',
          };
      }
    }
    return { success: false, message: '로그인 중에 에러가 발생하였습니다.' };
  }
};

export const logout = async (): Promise<ActionType<null>> => {
  try {
    await signOut({ redirect: false });

    return { success: true, message: '로그아웃에 성공 하였습니다.' };
  } catch (error) {
    return { success: false, message: '로그아웃에 실패 하였습니다.' };
  }
};

export const editNickname = async (newNickname: string): Promise<ActionType<User>> => {
  const session = await getSessionUserData();
  if (!session) throw new Error('인증이 필요합니다.');
  try {
    const checkNickName = await findUserByNickname(newNickname);
    if (checkNickName) return { success: false, message: '이미 사용중인 닉네임입니다.' };
    const updatedUser = await db.user.update({
      where: { id: session.id },
      data: { nickname: newNickname },
    });

    if (!updatedUser) return { success: false, message: '닉네임 수정에 실패하였습니다.' };

    return {
      success: true,
      message: '닉네임 수정에 성공하였습니다.',
      data: updatedUser,
    };
  } catch (error) {
    return {
      success: false,
      message: '닉네임 수정 중에 에러가 발생하였습니다.',
    };
  }
};

export const editPassword = async (newPassword: string): Promise<ActionType<User>> => {
  const session = await getSessionUserData();
  if (!session) throw new Error('인증이 필요합니다.');

  try {
    const updatedUser = await db.user.update({
      where: { id: session.id },
      data: { password: newPassword },
    });

    if (!updatedUser) return { success: false, message: '비밀번호 수정에 실패하였습니다.' };

    return {
      success: true,
      message: '비밀번호 수정에 성공하였습니다.',
      data: updatedUser,
    };
  } catch (error) {
    return {
      success: false,
      message: '비밀번호 수정 중에 에러가 발생하였습니다.',
    };
  }
};

export const editTags = async (tags: string[]): Promise<ActionType<User>> => {
  const session = await getSessionUserData();
  if (!session) throw new Error('인증이 필요합니다.');

  try {
    const updatedUser = await db.user.update({
      where: { id: session.id },
      data: { tags },
    });

    if (!updatedUser) return { success: false, message: '태그 수정에 실패하였습니다.' };

    return {
      success: true,
      message: '태그 수정에 성공하였습니다.',
      data: updatedUser,
    };
  } catch (error) {
    return { success: false, message: '태그 수정 중에 에러가 발생하였습니다.' };
  }
};

export const editImage = async (url: string): Promise<ActionType<User>> => {
  const session = await getSessionUserData();
  if (!session) throw new Error('인증이 필요합니다.');

  try {
    const updatedUser = await db.user.update({
      where: { id: session.id },
      data: { image: url },
    });

    if (!updatedUser) return { success: false, message: '프로필 이미지 수정에 실패하였습니다.' };

    return {
      success: true,
      message: '프로필 이미지 수정에 성공하였습니다.',
      data: updatedUser,
    };
  } catch (error) {
    return {
      success: false,
      message: '프로필 이미지 수정 중에 에러가 발생하였습니다.',
    };
  }
};

export const setFirstLoginToFalse = async (): Promise<ActionType<null>> => {
  const session = await getSessionUserData();
  if (!session) throw new Error('인증이 필요합니다.');

  try {
    const user = await db.user.update({
      where: { id: session.id },
      data: {
        isFirstLogin: false,
      },
    });
    if (!user) return { success: false, message: '수정에 실패하였습니다.' };
    cookies().delete('isFirstLogin');
    return {
      success: true,
      message: '수정에 성공하였습니다.',
    };
  } catch (error) {
    return {
      success: false,
      message: '수정 중에 에러가 발생하였습니다.',
    };
  }
};
