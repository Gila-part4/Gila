/* eslint-disable consistent-return */
import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, apiUploadThingPrefix, authRoutes } from '@/routes';
import { NextResponse } from 'next/server';
import { auth } from './auth';

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(`/${apiAuthPrefix}`);
  const isApiUploadthingRoute = nextUrl.pathname.startsWith(`/${apiUploadThingPrefix}`);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isMainPage = nextUrl.pathname === '/';
  const isDashboardRoute = nextUrl.pathname.startsWith(`/dashboard`);
  const isProfileRoute = nextUrl.pathname.startsWith(`/profile`);

  const isFirst = req.cookies.has('isFirstLogin');
  if (nextUrl.pathname !== '/topic') {
    if (isLoggedIn && isFirst) {
      return NextResponse.redirect(new URL('/topic', nextUrl));
    }
  }

  if (isApiAuthRoute) {
    return;
  }
  if (isApiUploadthingRoute) {
    return;
  }

  if ((!isLoggedIn && isDashboardRoute) || (!isLoggedIn && isProfileRoute)) {
    return NextResponse.redirect(new URL('/sign-in', nextUrl));
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (isLoggedIn && isMainPage) {
    return NextResponse.redirect(new URL('/activity-list', nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
