'use client';
import Image from 'next/image';
import styles from './navigation.module.css';
import Link from 'next/link';
import { useState } from 'react';
import BurgerButton from '@/components/BurgerButton/BurgerButton';

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav className={styles.main__nav}>
      <div className={styles.nav__logo}>
        <Link href="/music/main" className={styles.menu__link}>
          <Image
            width={113}
            height={17}
            className={styles.logo__image}
            src="/logo.png"
            alt={'logo'}
          />
        </Link>
      </div>

      <BurgerButton isOpen={menuOpen} toggle={toggleMenu} />

      <div
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
            <Link href="#" className={styles.menu__link}>
              Мои треки
            </Link>
          </li>
          <li className={styles.menu__item}>
            <Link href="/SignIn" className={styles.menu__link}>
              Выйти
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
