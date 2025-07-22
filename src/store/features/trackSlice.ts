import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrackType } from '@/app/sharedTypes/sharedTypes';

type initialStateType = {
  currentTrack: TrackType | null;
  isPlay: boolean;
  isShuffle: boolean;
  playlist: TrackType[];
  shuffledPlaylist: TrackType[];
  allTracks: TrackType[];
  fetchError: null | string;
  fetchIsLoading: boolean;
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlay: false,
  isShuffle: false,
  playlist: [],
  shuffledPlaylist: [],
  allTracks: [],
  fetchError: null,
  fetchIsLoading: true,
};

const trackSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
      state.currentTrack = action.payload;
    },
    setCurrentPlaylist: (state, action: PayloadAction<TrackType[]>) => {
      state.playlist = action.payload;
      state.shuffledPlaylist = [...state.playlist].sort(
        () => Math.random() - 0.5,
      );
    },
    setIsPlay: (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload;
    },
    toggleShuffle: (state) => {
      state.isShuffle = !state.isShuffle;
    },
    setNextTrack: (state) => {
      const playlist = state.isShuffle
        ? state.shuffledPlaylist
        : state.playlist;

      const curIndex = playlist.findIndex(
        (el) => el._id === state.currentTrack?._id,
      );
      const nextIndex = (curIndex + 1) % playlist.length;
      state.currentTrack = playlist[nextIndex];
    },
    setPrevTrack: (state) => {
      const playlist = state.isShuffle
        ? state.shuffledPlaylist
        : state.playlist;

      const curIndex = playlist.findIndex(
        (el) => el._id === state.currentTrack?._id,
      );
      const prevIndex = (curIndex - 1 + playlist.length) % playlist.length;
      state.currentTrack = playlist[prevIndex];
    },

    setAllTracks: (state, action: PayloadAction<TrackType[]>) => {
      state.allTracks = action.payload;
    },
    setFetchError: (state, action: PayloadAction<string>) => {
      state.fetchError = action.payload;
    },
    setFetchIsLoading: (state, action: PayloadAction<boolean>) => {
      state.fetchIsLoading = action.payload;
    },
    clearPlayer(state) {
      state.currentTrack = null;
      state.isPlay = false;
      state.playlist = [];
      state.shuffledPlaylist = [];
    },
  },
});

export const {
  setCurrentTrack,
  setIsPlay,
  setCurrentPlaylist,
  setNextTrack,
  toggleShuffle,
  setPrevTrack,
  setFetchIsLoading,
  setFetchError,
  setAllTracks,
  clearPlayer,
} = trackSlice.actions;

export const trackSliceReducer = trackSlice.reducer;
