import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import ErrorService from '../services/ErrorService';
import { AppThunk, AuthState, UserTypeEnum } from '../types';

export const initialState: AuthState = {
  role: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveUserRoleResponse(state, action: PayloadAction<UserTypeEnum>) {
      state.role = action.payload;
    },
  },
});

export const { saveUserRoleResponse } = authSlice.actions;

export const getAllFacultyApplications =
  (token: string): AppThunk =>
  async (dispatch) => {
    try {
      const { data } = await axios({
        method: 'get',
        url: 'https://leavemangement.onrender.com/apiv1/facultyaction/allapplication',
        headers: { Authorization: 'Bearer ' + token },
      });
      dispatch(saveUserRoleResponse(data.role));
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
      dispatch(saveUserRoleResponse(data.role));
    } catch (e: any) {
      ErrorService.notify('Unable to fetch applications', e);
    }
  };

export default authSlice.reducer;
