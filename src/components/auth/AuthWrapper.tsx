'use client';
import { useAppSelector } from '@/store/store';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAppSelector((state) => state.auth.user);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const publicPaths = ['/SignIn', '/SignUp'];
    if (publicPaths.includes(pathname)) {
      setIsLoading(false);
      return;
    }

    if (user) {
      setIsLoading(false);
      return;
    }
    const userData = localStorage.getItem('user');
    if (userData) {
      setIsLoading(false);
      return;
    }

    router.push('/SignIn');
    setIsLoading(false);
  }, [user, router, pathname]);

  return <>{children}</>;
}
