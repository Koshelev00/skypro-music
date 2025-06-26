import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrackType } from '../../app/sharedTypes/sharedTypes';

type initialStateType = {
  currentTrack: TrackType | null;
  isPlay: boolean;
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlay: false,
};

const trackSlice = createSlice({
  name: 'tracks',  
  initialState,  
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
    state.currentTrack = action.payload;    
    },  
  },
});

export const { setCurrentTrack } = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;