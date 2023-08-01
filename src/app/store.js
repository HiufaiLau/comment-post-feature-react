import { configureStore } from "@reduxjs/toolkit";

import postsReducer from "../features/posts/postSlice";
import UserReducer from "../features/users/usersSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: UserReducer,
  },
});
