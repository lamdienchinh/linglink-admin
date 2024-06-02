'use client';

import * as React from 'react';

import { useMutation } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import { PasswordInput } from './PasswordInput';
import { toast } from 'react-toastify';
import { setCookie } from 'cookies-next';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function UserLoginForm({
  className,
  ...props
}: UserAuthFormProps) {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async (values: any) => {
      console.log(process.env.NEXT_PUBLIC_BASE_URL);
      let response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
        {
          email: values.email,
          password: values.password
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      setCookie('accessToken', response.data.accessToken);
      setCookie('refreshToken', response.data.refreshToken);
      toast.success('Đăng nhập thành công');
      router.push('/dashboard/user', { scroll: false });
      return response;
    }
  });
  const loginform = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async (values) => {
      try {
        mutation.mutate(values);
      } catch (error: any) {
        console.log(error);
      }
    }
  });
  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={loginform.handleSubmit}>
        <div className="grid gap-2">
          <div className="mb-5 grid gap-1">
            <Label
              className="font-semibold after:ml-0.5 after:text-red-500 after:content-['*']"
              htmlFor="email"
            >
              Địa chỉ Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              onBlur={(event) => loginform.handleBlur(event)}
              onChange={(event) => loginform.handleChange(event)}
              value={loginform.values.email}
              disabled={mutation.isPending}
            />
            {loginform.touched.email && loginform.errors.email ? (
              <div className="my-1 ml-1 text-sm text-red-600">
                {loginform.errors.email}
              </div>
            ) : (
              <div className="my-1 text-sm opacity-0">OK</div>
            )}
            <Label
              className="font-semibold after:ml-0.5 after:text-red-500 after:content-['*']"
              htmlFor="password"
            >
              Mật khẩu
            </Label>
            <div className="relative">
              <PasswordInput
                id="password"
                className="w-full pr-12"
                placeholder="your password"
                autoCapitalize="none"
                autoCorrect="off"
                onBlur={loginform.handleBlur}
                onChange={loginform.handleChange}
                value={loginform.values.password}
                disabled={mutation.isPending}
              />
            </div>
            <div className="flex justify-between">
              {loginform.touched.password && loginform.errors.password ? (
                <div className="my-1 ml-1 text-sm text-red-600">
                  {loginform.errors.password}
                </div>
              ) : (
                <div className="my-1 text-sm opacity-0">OK</div>
              )}

              <Link href="/reset-password" className="w-fit text-right">
                <span className=" text-xs text-gray-400 underline">
                  Quên mật khẩu
                </span>
              </Link>
            </div>
          </div>
          <Button disabled={mutation.isPending} type="submit">
            Đăng nhập bằng Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Hoặc đăng nhập bằng
          </span>
        </div>
      </div>
    </div>
  );
}
