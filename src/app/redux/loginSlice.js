import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  user: "",
  token: "",
  data: null,
  error: null,
  loading: false,
  status: "validating",
};
const apiRoute = process.env.API_ROUTE;
export const login = createAsyncThunk("auth/login", async (requestData) => {
  // console.log('Dispatching postData action with:', requestData);
  try {
    const response = await axios.post(`${apiRoute}/adminlogin`, requestData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      //console.log('pending Reducer is being called');
      state.status = "validating";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      // console.log('fullfilled Reducer is being called');
      state.status = "true";
      state.data = action.payload;
      localStorage.setItem("loginResponse", JSON.stringify(action.payload));
    });
    builder.addCase(login.rejected, (state, action) => {
      // console.log('rejected Reducer is being called');
      state.status = "false";
      state.error = action.error.message;
    });
  },
});

export default authSlice.reducer;
// export const {addUser, addToken} = loginSlice.actions;
// export default loginSlice.reducer;
