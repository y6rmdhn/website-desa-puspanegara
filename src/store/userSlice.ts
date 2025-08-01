import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface IUser {
  id: string;
  username: string | null;
  token: string | null;
}

const initialState: IUser = {
  id: "",
  username: "",
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<IUser>) => {
      return { ...state, ...action.payload };
    },
    clearUserData: () => {
      return {
        id: "",
        username: "",
        token: "",
      };
    },
  },
});

export const { setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;
