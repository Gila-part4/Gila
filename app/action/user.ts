'use server';

import { signIn, signOut } from '@/auth';
import { db } from '@/lib/db';
import { hashPassword } from '@/lib/utils';
import { LoginSchema, RegisterSchema } from '@/schema';
import { ActionType, LoginSchemaType, RegisterSchemaType } from '@/type';
import { User } from '@prisma/client';
import { AuthError } from 'next-auth';
import { getCurrentUserId } from '../data/user';
import { cookies } from 'next/headers';

export const register = async (form: RegisterSchemaType): Promise<ActionType<User>> => {
  try {
    const validate = RegisterSchema.safeParse(form);
    if (!validate.success) return { success: false, message: '올바른 값을 입력해 주세요.' };

    const { email, password, nickname } = validate.data;

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
        nickname,
        password: hashedPassword,
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
          return { success: false, message: '잘못된 인증입니다.' };
        default:
          return {
            success: false,
            message: '이메일이나 패스워드가 잘못되었습니다.',
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
  try {
    const userId = await getCurrentUserId();

    const updatedUser = await db.user.update({
      where: { id: userId },
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
  try {
    const userId = await getCurrentUserId();

    const updatedUser = await db.user.update({
      where: { id: userId },
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
  try {
    const userId = await getCurrentUserId();

    const updatedUser = await db.user.update({
      where: { id: userId },
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
  try {
    const userId = await getCurrentUserId();

    const updatedUser = await db.user.update({
      where: { id: userId },
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
  try {
    const userId = await getCurrentUserId();

    const user = await db.user.update({
      where: { id: userId },
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
