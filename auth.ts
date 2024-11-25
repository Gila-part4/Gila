/* eslint-disable no-param-reassign */
import NextAuth, { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import Kakao from 'next-auth/providers/kakao';
import { hashPassword, verifyPassword } from './lib/utils';
import { LoginSchema } from './schema';
import db from './lib/db';

export const authConfig = {
  providers: [
    Kakao,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const validate = LoginSchema.safeParse(credentials);
          if (!validate.success) return null;
          const { email, password } = validate.data;

          const user = await db.user.findUnique({
            where: {
              email,
            },
          });
          if (!user) return null;

          const passwordsMatch = verifyPassword(password, user.password);
          if (!passwordsMatch) return null;

          return { ...user, nickname: user.nickname };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    signIn: async ({ user, account }) => {
      if (account?.provider === 'kakao') {
        try {
          const prismaUser = await db.user.findUnique({
            where: {
              email: user.email!,
            },
          });
          if (!prismaUser) {
            const hashRandomPassword = hashPassword(
              String(Math.floor(10000000 + Math.random() * 90000000)), // password 8자리 랜덤 생성
            );
            const newUser = await db.user.create({
              data: {
                email: user.email!,
                password: hashRandomPassword,
                nickname: user.name!,
              },
            });
            user.name = newUser.nickname;
            user.id = newUser.id;
            await db.account.create({
              data: {
                type: 'oauth',
                userId: newUser.id,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
              },
            });
            return true;
          }
          const linkedAccount = await db.account.findUnique({
            where: {
              provider_providerAccountId: {
                provider: account.provider,
                providerAccountId: account.providerAccountId,
              },
            },
          });

          if (!linkedAccount) {
            await db.account.create({
              data: {
                type: 'oauth',
                userId: prismaUser.id,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
              },
            });
          }

          user.nickname = prismaUser.nickname;
          user.id = prismaUser.id;
          return true;
        } catch {
          return false;
        }
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        if (user.id) token.id = user.id;
        if (user.nickname) token.nickname = user.nickname;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      session.user.nickname = token.nickname;
      return session;
    },
  },
} satisfies NextAuthConfig;

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
  trustHost: true,
});
