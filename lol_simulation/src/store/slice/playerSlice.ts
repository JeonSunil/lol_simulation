import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PlayerState {
  [result: string]: {
    nickName:string;
  }
}

const initialState: PlayerState = {
  top : {nickName:''},
  jug : {nickName:''},
  mid : {nickName:''},
  ad : {nickName:''},
  sup : {nickName:''},
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setPlayer: (
      state,
      action: PayloadAction<{ result:string; nickName:string }>
    ) => {
      const { result, nickName } = action.payload
      if (state[result]) {
        state[result].nickName = nickName
      } else {
        state[result] = { nickName } // 혹시 없는 심볼이 들어올 경우에도 대비
      }
    },
  },
})

export const { setPlayer } = playerSlice.actions;
export default playerSlice.reducer;
