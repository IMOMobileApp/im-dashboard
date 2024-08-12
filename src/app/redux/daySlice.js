import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showDay: true,
};

const daySlice = createSlice({
  name: "showday",

  initialState,

  reducers: {
    dayHide: (state, action) => {
      //console.log(action);

      state.showDay = false;

      state.payload = action.payload; // Include payload in state
    },

    dayShow: (state, action) => {
      //console.log(action);

      state.showDay = true;

      state.payload = action.payload; // Include payload in state
    },
  },
});

export const { dayHide, dayShow } = daySlice.actions;

export default daySlice.reducer;
