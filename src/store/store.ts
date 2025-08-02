import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore } from 'react-redux';
import {
  setCurrentPlaylist,
  trackSliceReducer,
} from '@/store/features/trackSlice';
import { data } from '@/data';

export const makeStore = () => {
  const store = configureStore({
    reducer: combineReducers({
      tracks: trackSliceReducer,
    }),
  });

  if (typeof window !== 'undefined') {
    const initialState = store.getState();
    if (initialState.tracks.playlist.length === 0) {
      store.dispatch(setCurrentPlaylist(data));
    }
  }

  return store;
};

export type AppStore = ReturnType<typeof makeStore>;

type RootState = ReturnType<AppStore['getState']>;
type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
