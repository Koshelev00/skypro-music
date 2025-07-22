'use client';
import { useRef, useEffect } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from './store';
import { loadUser } from './features/authSlice';

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleStorageChange = () => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          try {
            const userData = JSON.parse(savedUser);
            storeRef.current?.dispatch(loadUser(userData));
          } catch (e) {
            console.error('Failed to parse user data', e);
            storeRef.current?.dispatch(loadUser(null));
          }
        } else {
          storeRef.current?.dispatch(loadUser(null));
        }
      };

      handleStorageChange();

      window.addEventListener('storage', handleStorageChange);

      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
