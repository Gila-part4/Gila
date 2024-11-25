import Link from 'next/link';
import RegisterForm from '@/app/(auth)/sign-up/_components/register-form';
import OAuthButton from '../_components/oauth-button';

export default function Page() {
  return (
    <div className="flex flex-col gap-5 px-5">
      <RegisterForm />
      <OAuthButton />
      <div className="flex items-center justify-center gap-x-2">
        <p className="text-gray-500">
          이미 길라와 연결되셨다면?
          <Link
            href="/sign-in"
            className="font-semibold underline text-primary hover:text-primary_dark focus:text-primary_dark"
          >
            로그인하기
          </Link>
        </p>
      </div>
    </div>
  );
}
