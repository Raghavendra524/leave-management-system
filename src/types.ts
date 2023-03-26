import rootReducer from './slices/rootReducer';
import store from './slices/store';

export type EnumMap<E extends string, T> = {
  [key in E]: T;
};

export interface ISelectOption<T extends string = string> {
  value: T;
  label: string;
  subLabel?: string;
  disabled?: boolean;
}

export enum BranchesEnum {
  CSE = 'CSE',
  ECE = 'ECE',
  MECHANICAL = 'MECHANICAL',
  EEE = 'EEE',
  CIVIL = 'CIVIL',
}

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof rootReducer>;

export enum UserTypeEnum {
  FACULTY = 'FACULTY',
  STUDENT = 'STUDENT',
}

export enum LeaveStatusEnum {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export enum ErrorCode {
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  SERVER_ERROR = 'SERVER_ERROR',
}

export interface AsyncResponse<T, P extends Record<string, any> = {}> {
  data?: T;
  error?: ErrorCode | null;
  loading: boolean;
  name: string;
  additionalProps?: P;
}

export interface LeaveRequest {
  title: string;
  desc: string;
  from: string;
  to: string;
  status: LeaveStatusEnum;
}

export interface StudentResponse {
  student_id: string;
  student_name: string;
  mobile_number: string;
  email_id: string;
  department: BranchesEnum;
  faculty_id: string;
  degree: string;
  specialization: string;
  entrance: 'GATE' | 'SELF_SPONSORED';
  user_type: UserTypeEnum.STUDENT;
  leaves: LeaveRequest[];
}

export interface FacultyRequestResponse {
  student: Omit<StudentResponse, 'faculty_id' | 'leaves' | 'user_type'>;
  request: LeaveRequest;
}

export interface FacultyResponse {
  faculty_id: string;
  faculty_name: string;
  mobile_number: string;
  email_id: string;
  user_type: UserTypeEnum.FACULTY;
  request: FacultyRequestResponse[];
}

export interface AuthState {
  userResponse: AsyncResponse<StudentResponse | FacultyResponse>;
}
