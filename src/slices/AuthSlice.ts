import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  AuthState,
  AsyncResponse,
  FacultyResponse,
  StudentResponse,
} from '../types';

export const initialState: AuthState = {
  userResponse: { name: 'details', loading: false },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveUserResponse(
      state,
      action: PayloadAction<AsyncResponse<StudentResponse | FacultyResponse>>
    ) {
      state.userResponse = action.payload;
    },
  },
});

export const { saveUserResponse } = authSlice.actions;

export default authSlice.reducer;
