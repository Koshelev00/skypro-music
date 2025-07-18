import styles from './signup.module.css';
import classNames from 'classnames';
import Link from 'next/link';

export default function SignUp() {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.containerEnter}>
          <div className={styles.modal__block}>
            <form className={styles.modal__form}>
              <Link href="/">
                <div className={styles.modal__logo}>
                  <img src="/logo_modal.png" alt="logo" />
                </div>
              </Link>
              <input
                className={classNames(styles.modal__input, styles.login)}
                type="text"
                name="login"
                placeholder="Почта"
              />
              <input
                className={styles.modal__input}
                type="password"
                name="password"
                placeholder="Пароль"
              />
              <input
                className={styles.modal__input}
                type="password"
                name="password"
                placeholder="Повторите пароль"
              />
              <div className={styles.errorContainer}></div>
              <Link href={'/SignIn'}>
                <button className={styles.modal__btnSignupEnt}>
                  Зарегистрироваться
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
