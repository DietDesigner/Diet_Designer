import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../types/authType";
export type AuthSliceType = {
  auth?: any;
  user: UserType | undefined | null;
};
const isWindowDefined = typeof window !== "undefined";

const USER = isWindowDefined ? localStorage.getItem("USER") : null;

let parsedUser = null;

try {
  parsedUser = USER ? JSON.parse(USER) : null;
} catch (error) {
  // eslint-disable-next-line no-console
  console.error(`Failed to parse USER from localStorage: ${error}`);
}
const initialState: AuthSliceType = {
  user: parsedUser,
  auth: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveUser: (state, action) => {
      console.log(action.payload, state);
    },
  },
});

export const { saveUser } = authSlice.actions;
export default authSlice.reducer;
