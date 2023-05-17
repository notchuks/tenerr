import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import gigReducer from "./gigs/gigSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    gigs: gigReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>