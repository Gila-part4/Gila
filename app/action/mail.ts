'use server';

import formatDateRange from '@/utils/formatDateRange';
import nodemailer from 'nodemailer';
import { ActivityWithUserAndFavorite, User } from '@/type';
import { Activity } from '@prisma/client';
import { getSessionUserData, getUserProfileWithIntroducedInfos } from '@/app/data/user';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.NEXT_PUBLIC_EMAIL_ADDRESS,
    pass: process.env.NEXT_PUBLIC_EMAIL_KEY,
  },
});

export const sendEmail = async (email: string) => {
  const randomKey = `${Math.floor(100000 + Math.random() * 900000)}`;

  try {
    await transporter.sendMail({
      from: process.env.NEXT_PUBLIC_EMAIL_ADDRESS,
      to: email,
      subject: 'Gila 이메일 인증 번호 입니다.',
      html: `<h1>Gila 이메일 인증 번호입니다.</h1>
          <h2>인증번호 : ${randomKey}</h2>
          <p>본 메일은 보안을 위해 확인 후 삭제 하시기 바랍니다.</p>
          `,
    });
    return { message: '메일 전송에 성공했습니다.', key: randomKey };
  } catch (error) {
    throw new Error('메일 전송에 실패했습니다.');
  }
};

export const requestMail = async (activity: ActivityWithUserAndFavorite) => {
  const session = await getSessionUserData();
  if (!session) throw new Error('인증이 필요합니다.');
  try {
    const date = formatDateRange({
      startDateString: activity.startDate,
      endDateString: activity.endDate,
    });
    const owner = await getUserProfileWithIntroducedInfos(activity.userId);
    await transporter.sendMail({
      from: process.env.NEXT_PUBLIC_EMAIL_ADDRESS,
      to: owner.user.email,
      subject: `"${activity.title}" 활동 신청 요청이 있습니다.`,
      html: `<h1>${activity.title}</h1>
      <h2>세부 일정: ${date}</h2>
      <p>신청자: ${session.name}</p>
      <a href="${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/promised-list">확인하러 가기</a>
      `,
    });
    return { message: '길라에게 메일을 전송했습니다.' };
  } catch (error) {
    return {
      message: '메일 전송중 에러가 발생하였습니다.',
    };
  }
};

export const responseMail = async (
  activity: Activity,
  requsetUser: User,
  result: 'approve' | 'reject',
) => {
  const session = await getSessionUserData();
  if (!session) throw new Error('인증이 필요합니다.');
  try {
    const date = formatDateRange({
      startDateString: activity.startDate,
      endDateString: activity.endDate,
    });
    await transporter.sendMail({
      from: process.env.NEXT_PUBLIC_EMAIL_ADDRESS,
      to: requsetUser.email,
      subject: `"${activity.title}" 활동 신청 결과입니다.`,
      html: `<h1>${activity.title}</h1>
    <h2>세부 일정 : ${date}</h2>
    <p>길라 : ${session.name}</p>
    <p>결과 : ${result === 'approve' ? '수락됨' : '거절됨'}</p>
    <a href="${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/promise-list">확인하러 가기</a>
    `,
    });
    return { message: '길라에게 메일을 전송했습니다.' };
  } catch (error) {
    return {
      message: '메일 전송중 에러가 발생하였습니다.',
    };
  }
};
