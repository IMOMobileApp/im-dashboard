import { configureStore } from "@reduxjs/toolkit";

import authReducer from "@/app/redux/loginSlice";

import leftbarReducer from "@/app/redux/leftbarSlice";

import dayReducer from "@/app/redux/daySlice";

const store = configureStore({
  reducer: {
    // login:loginSlice

    auth: authReducer,

    toggleLeftBar: leftbarReducer,

    toggleDay: dayReducer,
  },
});

//console.log('Initial State:', store.getState());

export default store;
