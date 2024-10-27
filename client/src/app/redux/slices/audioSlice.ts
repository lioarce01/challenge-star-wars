import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AudioState {
  volume: number;
  isPlaying: boolean;
}

const initialState: AudioState = {
  volume: 0.1,
  isPlaying: true,
};

export const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying;
    },
  },
});

export const { setVolume, togglePlay } = audioSlice.actions;
export default audioSlice.reducer;
