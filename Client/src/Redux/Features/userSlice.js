import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    name: "",
    username: "",
    id: "",
    about: "",
    imageurl: "",
    user: "",
    img: "",
    chat: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    deleteUser(state) {
      state.user = initialState.user; // Reset to initial user object
    },
  },
});

export const { setUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
