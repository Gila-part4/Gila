import Link from 'next/link';
import LoginForm from '@/app/(auth)/sign-in/_components/login-form';
import OAuthButton from '../_components/oauth-button';

export default function Page() {
  return (
    <div className="flex flex-col justify-center items-center gap-3 px-5">
      <LoginForm />
      <OAuthButton />
      <div className="flex items-center justify-center gap-x-2">
        <p className="text-gray-500">
          길라가 처음인가요?
          <Link
            href="/sign-up"
            className="font-semibold underline text-primary hover:text-primary_dark focus:text-primary_dark"
          >
            회원가입하기
          </Link>
        </p>
      </div>
    </div>
  );
}
