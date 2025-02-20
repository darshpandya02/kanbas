import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentUser: null,
  users: [],
};
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});
export const { setCurrentUser, setUsers } = accountSlice.actions;
export default accountSlice.reducer;
