/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { DefaultUser } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: { nickname: string } & DefaultSession['user'];
    nickname: string;
  }

  interface User extends DefaultUser.user {
    nickname: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    nickname: string;
  }
}
