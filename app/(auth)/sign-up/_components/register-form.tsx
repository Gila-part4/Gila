'use client';

import { RegisterSchema } from '@/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState, useTransition } from 'react';
import { RegisterSchemaType } from '@/type';
import { register } from '@/app/action/user';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import PasswordInput from '@/components/ui/password-input';
import { cn } from '@/lib/utils';
import PrimaryCTAButton from '@/components/common/primary-CTA-button';
import { sendEmail } from '@/app/action/mail';
import { Button } from '@/components/ui/button';
import { registerFields } from '@/constants/form-schema';

export default function RegisterForm() {
  const [isCheck, setIsCheck] = useState(false);
  const [emailKey, setEmailKey] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      nickname: '',
      email: '',
      emailCheck: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'all',
  });

  const requsetKey = async () => {
    setIsCheck(true);
    const result = await sendEmail(form.getValues('email'));
    setEmailKey(result.key);
    toast.message('이메일을 확인해주세요.(스팸메일함도 확인해주세요.)');
  };

  const checkKey = () => {
    if (emailKey !== form.getValues('emailCheck')) {
      setValidEmail(false);
      form.setError('emailCheck', {
        type: 'manual',
        message: '인증번호가 일치하지 않습니다.',
      });
    } else {
      setValidEmail(true);
      toast.message('이메일 인증에 성공했습니다.');
    }
  };

  function onSubmit(values: RegisterSchemaType) {
    startTransition(async () => {
      const action = await register(values);
      if (!action.success) {
        toast.error(action.message);
        return;
      }
      router.replace('/sign-in');
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <h1 className="mb-2 text-xl font-semibold">회원가입</h1>
        <FormField
          control={form.control}
          name={registerFields[0].name as keyof RegisterSchemaType}
          render={({ field: controllerField }) => (
            <FormItem className="relative">
              <FormLabel>{registerFields[0].label}</FormLabel>
              <FormControl className="text-base">
                <div className="relative">
                  <Input
                    type={registerFields[0].type}
                    placeholder={registerFields[0].placeholder}
                    className={cn(
                      form.getFieldState(registerFields[0].name as keyof RegisterSchemaType)
                        .error && 'bg-red bg-opacity-10 border-red',
                      'border border-gray-300',
                    )}
                    {...controllerField}
                  />
                </div>
              </FormControl>
              <div className="h-5">
                <FormMessage className="text-xs" />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={registerFields[1].name as keyof RegisterSchemaType}
          render={({ field: controllerField }) => (
            <FormItem className="relative">
              <FormLabel>{registerFields[1].label}</FormLabel>
              <FormControl className="text-base">
                <div className="relative">
                  <Input
                    type={registerFields[1].type}
                    placeholder={registerFields[1].placeholder}
                    className={cn(
                      form.getFieldState(registerFields[1].name as keyof RegisterSchemaType)
                        .error && 'bg-red bg-opacity-10 border-red',
                      'border border-gray-300',
                    )}
                    {...controllerField}
                  />
                  <Button
                    type="button"
                    className="text-white absolute top-1/2 right-1 -translate-y-1/2 w-10 h-8"
                    onClick={requsetKey}
                    disabled={
                      isCheck || !form.getValues('email') || !!form.getFieldState('email').invalid
                    }
                  >
                    인증
                  </Button>
                </div>
              </FormControl>
              <div className="h-5">
                <FormMessage className="text-xs" />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={registerFields[2].name as keyof RegisterSchemaType}
          render={({ field: controllerField }) => (
            <FormItem className="relative">
              <FormLabel>{registerFields[2].label}</FormLabel>
              <FormControl className="text-base">
                <div className="relative">
                  <Input
                    disabled={!isCheck}
                    type={registerFields[2].type}
                    placeholder={registerFields[2].placeholder}
                    className={cn(
                      form.getFieldState(registerFields[2].name as keyof RegisterSchemaType)
                        .error && 'bg-red bg-opacity-10 border-red',
                      'border border-gray-300',
                    )}
                    {...controllerField}
                  />
                  <Button
                    type="button"
                    className="text-white absolute top-1/2 right-1 -translate-y-1/2 w-10 h-8"
                    onClick={checkKey}
                    disabled={!isCheck}
                  >
                    확인
                  </Button>
                </div>
              </FormControl>
              <div className="h-5">
                <FormMessage className="text-xs" />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={registerFields[3].name as keyof RegisterSchemaType}
          render={({ field: controllerField }) => (
            <FormItem className="relative">
              <FormLabel>{registerFields[3].label}</FormLabel>
              <FormControl className="text-base">
                <PasswordInput
                  placeholder={registerFields[3].placeholder}
                  autoComplete="off"
                  className={cn(
                    form.getFieldState(registerFields[3].name as keyof RegisterSchemaType).error &&
                      'bg-red bg-opacity-10 border-red',
                    'border border-gray-300',
                  )}
                  {...controllerField}
                />
              </FormControl>
              <div className="h-5">
                <FormMessage className="text-xs" />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={registerFields[4].name as keyof RegisterSchemaType}
          render={({ field: controllerField }) => (
            <FormItem className="relative">
              <FormLabel>{registerFields[4].label}</FormLabel>
              <FormControl className="text-base">
                <PasswordInput
                  placeholder={registerFields[4].placeholder}
                  autoComplete="off"
                  className={cn(
                    form.getFieldState(registerFields[4].name as keyof RegisterSchemaType).error &&
                      'bg-red bg-opacity-10 border-red',
                    'border border-gray-300',
                  )}
                  {...controllerField}
                />
              </FormControl>
              <div className="h-5">
                <FormMessage className="text-xs" />
              </div>
            </FormItem>
          )}
        />
        <PrimaryCTAButton
          text="회원가입"
          disabled={isPending || !form.formState.isValid || !validEmail}
          type="submit"
          isPending={isPending}
        />
      </form>
    </Form>
  );
}
