import Image from 'next/image';
import styles from './navigation.module.css';
import Link from 'next/link';
export default function Nav() {
  return (
    <nav className={styles.main__nav}>
      <div className={styles.nav__logo}>
        {/*TODO: img –> Image*/}
        <Image
          width={250}
          height={170}
          className={styles.logo__image}
          src="/logo.png"
          alt={'logo'}
        />
      </div>
      <div className={styles.nav__burger}>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
      </div>
      <div className={styles.nav__menu}>
        <ul className={styles.menu__list}>
          <li className={styles.menu__item}>
            {/*TODO: a -> Link*/}
            <Link href="#" className={styles.menu__link}>
              Главное
            </Link>
          </li>
          <li className={styles.menu__item}>
            <Link href="#" className={styles.menu__link}>
              Мой плейлист
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
