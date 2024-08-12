"use client";
import { createSlice } from "@reduxjs/toolkit";

//const deviceWidth = window.innerWidth;
//if(typeof window !== 'undefined')
//{
//window.innerWidth;
//}

const deviceWidth = function () {
  if (typeof window !== "undefined") {
    return window.innerWidth;
  } else {
    return 400;
  }
};

// function getWidth(){
//     if(typeof window !== 'undefined'){
//         const deviceWidth = window.innerWidth;
//         if(deviceWidth < 500){
//             return false
//         }
//         else{ return true}
//     }
//     else{
//         console.log('window is not defined')
//     }
// }

function getWidth() {
  // console.log(deviceWidth())
  if (deviceWidth() < 500) {
    return false;
  } else {
    return true;
  }
}

const initialState = {
  showLeftBar: getWidth(),
};

const leftbarSlice = createSlice({
  name: "showleftbar",

  initialState,

  reducers: {
    leftBarHide: (state, action) => {
      //console.log(action);

      state.showLeftBar = false;

      state.payload = action.payload; // Include payload in state
    },

    leftBarShow: (state, action) => {
      //console.log(action);

      state.showLeftBar = true;

      state.payload = action.payload; // Include payload in state
    },
  },
});

export const { leftBarHide, leftBarShow } = leftbarSlice.actions;

export default leftbarSlice.reducer;
