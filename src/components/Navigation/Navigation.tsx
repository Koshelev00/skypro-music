'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useCallback, useRef } from 'react';
import styles from './navigation.module.css';
import BurgerButton from '@/components/BurgerButton/BurgerButton';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { clearUser, setIsAuth } from '@/store/features/authSlice';
import { useRouter } from 'next/navigation';
import { setFavoriteTracks } from '@/store/features/trackSlice';

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLDivElement>(null);

  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        burgerRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !burgerRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  const handleLogout = () => {
    if (isAuth) {
      dispatch(clearUser());
      dispatch(setIsAuth(false));
      dispatch(setFavoriteTracks([]));
      router.push('/music/main');
    } else {
      router.push('/SignIn');
    }
  };

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      dispatch(setIsAuth(true));
    }
  }, [dispatch]);

  return (
    <nav className={styles.main__nav}>
      <div className={styles.nav__logo}>
        <Link href="/music/main">
          <Image
            width={113}
            height={17}
            className={'logo__image'}
            src="/logo.png"
            alt={'logo'}
          />
        </Link>
      </div>
      <div ref={burgerRef}>
        <BurgerButton isOpen={menuOpen} toggle={toggleMenu} />
      </div>
      <div
        ref={menuRef}
        className={`${styles.nav__menu} ${
          menuOpen ? styles.nav__menu_open : ''
        }`}
      >
        <ul className={styles.menu__list}>
          <li className={styles.menu__item}>
            <Link href="/music/main" className={styles.menu__link}>
              Главное
            </Link>
          </li>
          <li className={styles.menu__item}>
            <Link
              href={isAuth ? '/music/favorite' : '/SignIn'}
              className={styles.menu__link}
            >
              Мои треки
            </Link>
          </li>
          <li className={styles.menu__item} onClick={handleLogout}>
            <div className={styles.menu__link}>
              {isAuth ? 'Выйти' : 'Войти'}
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}
