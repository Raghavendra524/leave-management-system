import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import ErrorService from '../services/ErrorService';
import {
  AppThunk,
  AuthState,
  FacultyApplicationResponse,
  StudentApplicationsResponse,
  UserTypeEnum,
} from '../types';

export const initialState: AuthState = {
  role: undefined,
  appLoading: false,
  studentApplications: [],
  facultyApplications: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveUserRoleResponse(
      state,
      action: PayloadAction<UserTypeEnum | undefined>
    ) {
      state.role = action.payload;
    },
    saveAppLoading(state, action: PayloadAction<boolean>) {
      state.appLoading = action.payload;
    },
    saveStudentApplications(
      state,
      action: PayloadAction<StudentApplicationsResponse[]>
    ) {
      state.studentApplications = action.payload;
    },
    saveFacultyApplications(
      state,
      action: PayloadAction<FacultyApplicationResponse[]>
    ) {
      state.facultyApplications = action.payload;
    },
  },
});

export const {
  saveUserRoleResponse,
  saveAppLoading,
  saveStudentApplications,
  saveFacultyApplications,
} = authSlice.actions;

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
      dispatch(saveFacultyApplications(data.data));
    } catch (e: any) {
      ErrorService.notify('Unable to fetch applications', e);
    }
  };

export const getAllStudentApplications =
  (token: string, onFetch?: boolean): AppThunk =>
  async (dispatch) => {
    dispatch(saveAppLoading(true));
    try {
      const { data } = await axios({
        method: 'get',
        url: 'https://leavemangement.onrender.com/apiv1/studentaction/applicationhistory',
        headers: { Authorization: 'Bearer ' + token },
      });
      dispatch(saveUserRoleResponse(data.role));
      dispatch(saveStudentApplications(data.data));
    } catch (e: any) {
      if (onFetch) {
        dispatch(getAllFacultyApplications(token));
      }
      ErrorService.notify('Unable to fetch applications', e);
    } finally {
      dispatch(saveAppLoading(false));
    }
  };

export default authSlice.reducer;
