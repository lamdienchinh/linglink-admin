'use client';
import Link from 'next/link';
import Lottie from 'lottie-react';
import educationAnimation from '@/public/imgs/education.json';
import UserLoginForm from './Form';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import logo from '@/app/icon.ico';

export default function LoginIn() {
  return (
    <>
      <div className="container relative hidden h-screen flex-col items-center justify-center bg-background md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-[#5f99e4]" />
          <div className="relative z-20 flex w-full items-center justify-center gap-4 text-center text-[60px] font-bold text-white">
            <Image src={logo} className="h-[100px] w-[100px]" alt="logo" />
            Ling Link
          </div>
          <div className="relative z-20 mt-6">
            <Lottie animationData={educationAnimation} loop={true} />
            <div className="animate-typing mt-6 overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-2 text-2xl font-bold text-white">
              LingLink - ứng dụng cộng đồng học ngôn ngữ bổ ích.
            </div>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Đăng nhập
              </h1>
              <p className="text-sm text-muted-foreground">
                Nhập tài khoản và mật khẩu
              </p>
            </div>
            <UserLoginForm />
            <Button>
              <Link href="/signin">Đăng ký tài khoản mới</Link>
            </Button>
            <p className="px-8 text-center text-sm text-muted-foreground">
              Bằng cách nhấp tiếp tục, bạn đồng ý với{' '}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Điều khoản dịch vụ
              </Link>{' '}
              and{' '}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Chính sách quyền riêng tư{' '}
              </Link>
              của chúng tôi.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
