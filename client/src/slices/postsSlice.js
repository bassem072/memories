import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchPosts, createPost, updatePost, deletePost, likePost } from "../api";

const initialState = {
  posts: [],
  loading: false,
  createLoading: false,
  error: false,
  createError: false,
};

export const postsAsync = createAsyncThunk("posts/findAll", async () => {
  const response = await fetchPosts();
  return response.data;
});

export const CreatePostAsync = createAsyncThunk("post/create", async (post) => {
  const response = await createPost(post);
  return response.data;
});

export const UpdatePostAsync = createAsyncThunk("post/update", async (data) => {
  const {id, post} = data;
  console.log(post);
  const response = await updatePost(id, post);
  return response.data;
});

export const DeletePostAsync = createAsyncThunk("post/delete", async (id) => {
  const response = await deletePost(id);
  return response.data;
});

export const LikePostAsync = createAsyncThunk("post/like", async (id) => {
  const response = await likePost(id);
  return response.data;
});
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postsAsync.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(postsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(postsAsync.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(CreatePostAsync.pending, (state) => {
        state.createLoading = true;
        state.createError = false;
      })
      .addCase(CreatePostAsync.fulfilled, (state, action) => {
        state.createError = false;
        state.posts = [...state.posts, action.payload];
      })
      .addCase(CreatePostAsync.rejected, (state) => {
        state.createLoading = false;
        state.createError = true;
      })
      .addCase(UpdatePostAsync.pending, (state) => {
        state.createLoading = true;
        state.createError = false;
      })
      .addCase(UpdatePostAsync.fulfilled, (state, action) => {
        state.createError = false;
        const posts = [...state.posts];
        const postIndex = posts.findIndex(post => post._id === action.payload._id);
        posts[postIndex] = action.payload;
        state.posts = [...posts];
      })
      .addCase(UpdatePostAsync.rejected, (state) => {
        state.createLoading = false;
        state.createError = true;
      })
      .addCase(DeletePostAsync.pending, (state) => {
        state.createLoading = true;
        state.createError = false;
      })
      .addCase(DeletePostAsync.fulfilled, (state, action) => {
        state.createError = false;
        const posts = [...state.posts];
        const postIndex = posts.findIndex(post => post._id === action.payload._id);
        if(postIndex > -1){
          posts.splice(postIndex, 1);
          state.posts = [...posts];
        }
      })
      .addCase(DeletePostAsync.rejected, (state) => {
        state.createLoading = false;
        state.createError = true;
      })
      .addCase(LikePostAsync.pending, (state) => {
        state.createLoading = true;
        state.createError = false;
      })
      .addCase(LikePostAsync.fulfilled, (state, action) => {
        state.createError = false;
        const posts = [...state.posts];
        const postIndex = posts.findIndex(post => post._id === action.payload._id);
        posts[postIndex] = action.payload;
        state.posts = [...posts];
      })
      .addCase(LikePostAsync.rejected, (state) => {
        state.createLoading = false;
        state.createError = true;
      });
  },
});

export default postSlice.reducer;
