import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = null;

export const loginAsync = createAsyncThunk('user/login', async () => {

});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {}
});

//export const {} = userSlice.actions

export default userSlice.reducer