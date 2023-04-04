import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import ErrorService from '../services/ErrorService';
import {
  AuthState,
  AsyncResponse,
  FacultyResponse,
  StudentResponse,
  AppThunk,
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

export const getAllFacultyApplications =
  (token: string): AppThunk =>
  async (dispatch) => {
    try {
      const { data } = await axios({
        method: 'get',
        url: 'https://leavemangement.onrender.com/apiv1/facultyaction/allapplication',
        headers: { Authorization: 'Bearer ' + token },
      });
      console.log('Data:', data);
    } catch (e: any) {
      ErrorService.notify('Unable to fetch applications', e);
    }
  };

export const getAllStudentApplications =
  (token: string): AppThunk =>
  async (dispatch) => {
    try {
      const { data } = await axios({
        method: 'get',
        url: 'https://leavemangement.onrender.com/apiv1/studentaction/applicationhistory',
        headers: { Authorization: 'Bearer ' + token },
      });
      console.log('Data:', data);
    } catch (e: any) {
      ErrorService.notify('Unable to fetch applications', e);
    }
  };

export default authSlice.reducer;
