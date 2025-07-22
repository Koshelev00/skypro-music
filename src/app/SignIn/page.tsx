'use client';
import { useAppSelector } from '@/store/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Signin from '@/components/auth/signin';

export default function SignInPage() {
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/music/main');
    }
  }, [user, router]);

  return <Signin />;
}
