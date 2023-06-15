import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import PostsReducer from '../slices/postsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: PostsReducer,
  },
});
