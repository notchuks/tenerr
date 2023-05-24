import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { gigsApi } from "./query/fetchGigs";
import { userApi } from "./query/fetchUser";
import { reviewsApi } from "./query/reviews";
import { ordersApi } from "./query/orders";
import { conversationApi } from "./query/conversation";
import userReducer from "./user/userSlice";
import gigReducer from "./gigs/gigSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    gigs: gigReducer,
    [gigsApi.reducerPath]: gigsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [conversationApi.reducerPath]: conversationApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling, and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(gigsApi.middleware, userApi.middleware, reviewsApi.middleware, ordersApi.middleware, conversationApi.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>