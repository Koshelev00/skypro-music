import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType } from '@/app/sharedTypes/sharedTypes';

interface AuthState {
  user: UserType | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserType | null>) {
      state.user = action.payload;
      if (typeof window !== 'undefined' && action.payload) {
        localStorage.setItem('user', JSON.stringify(action.payload));
      }
    },
    clearUser(state) {
      state.user = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
      }
    },
    loadUser(state, action: PayloadAction<UserType | null>) {
      state.user = action.payload;
    },
  },
});

export const { setUser, clearUser, loadUser } = authSlice.actions;
export default authSlice.reducer;
