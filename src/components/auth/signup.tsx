'use client';
import styles from './signup.module.css';
import { useCallback, useState } from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';
import { signUp } from '@/services/auth';
import { useRouter } from 'next/navigation';
import { setUser, setIsAuth } from '@/store/features/authSlice';

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError('');
      setIsLoading(true);
      try {
        const user = await signUp(formData);

        if (user) {
          router.push('/SignIn');
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message || 'Что-то пошло не так');
        }
      }
    },
    [formData, router],
  );
  return (
    <div className={styles.wrapper}>
      <div className={styles.containerEnter}>
        <div className={styles.modal__block}>
          <form className={styles.modal__form} onSubmit={handleSubmit}>
            <Link href="/music/main">
              <div className={styles.modal__logo}>
                <Image
                  src="/logo_modal.png"
                  alt="logo"
                  width={140}
                  height={21}
                />
              </div>
            </Link>
            <input
              className={classNames(styles.modal__input, styles.login)}
              type="text"
              name="username"
              placeholder="Имя"
              autoComplete="username"
              onChange={handleChange}
              value={formData.username}
              required
            />
            <input
              className={styles.modal__input}
              type="email"
              name="email"
              placeholder="Почта"
              autoComplete="email"
              onChange={handleChange}
              value={formData.email}
              required
            />
            <input
              className={styles.modal__input}
              type="password"
              name="password"
              placeholder="Пароль"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
            />
            <div className={styles.errorContainer}>{error}</div>
            <button disabled={isLoading} className={styles.modal__btnSignupEnt}>
              Зарегистрироваться
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
