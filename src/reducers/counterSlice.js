import { createSlice } from '@reduxjs/toolkit'
export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    SbetAmount: 0,
    StokenBalance: 0,
    Sapproveamount: 0
  },
  reducers: {
    CSbetAmount: (state, action) => {
      state.SbetAmount = action.payload
    },
    CStokenBalance: (state, action) => {
      state.StokenBalance = action.payload
    },
    CSapproveamount: (state, action) => {
      state.Sapproveamount = action.payload
    },
  },
})
export const { CSbetAmount, CStokenBalance, CSapproveamount } = counterSlice.actions
export default counterSlice.reducer