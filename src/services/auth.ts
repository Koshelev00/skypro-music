import axios from 'axios';
import { BASE_URL, RoutesApp } from '@/constants';
import { UserType } from '@/app/sharedTypes/sharedTypes';

type ApiError = {
  error?: string;
  message?: string;
};

export async function signIn(userData: {
  email: string;
  password: string;
}): Promise<UserType> {
  try {
    const { data } = await axios.post(
      `${BASE_URL}${RoutesApp.login}`,
      userData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return data;
  } catch (error) {
    if (error instanceof Error) {
      if (axios.isAxiosError(error) && error.response) {
        const apiErr = error.response.data as ApiError;
        throw new Error(apiErr.error ?? apiErr.message ?? 'Ошибка входа');
      }
      throw new Error(error.message);
    }
    throw new Error('Неизвестная ошибка');
  }
}

export async function signUp(userData: {
  username: string;
  email: string;
  password: string;
}): Promise<UserType> {
  try {
    const { data } = await axios.post(
      `${BASE_URL}${RoutesApp.sighup}`,
      userData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return data;
  } catch (error) {
    if (error instanceof Error) {
      if (axios.isAxiosError(error) && error.response) {
        const apiErr = error.response.data as ApiError;
        throw new Error(apiErr.error ?? apiErr.message ?? 'Ошибка регистрации');
      }
      throw new Error(error.message);
    }
    throw new Error('Неизвестная ошибка');
  }
}
