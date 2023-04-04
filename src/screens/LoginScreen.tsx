import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';
import ControlledTextInput from '../components/controlled-inputs/ControlledTextInput';
import Layout from '../components/Layout';
import ErrorService from '../services/ErrorService';
import {
  getAllFacultyApplications,
  getAllStudentApplications,
  saveUserRoleResponse,
} from '../slices/AuthSlice';
import { AppDispatch } from '../types';
import { setAuthCookie } from '../utils/ApiUtils';
import { PASSWORD_VALIDATIONS } from '../utils/validations';

interface FormData {
  userIdOrEmail: string;
  password: string;
  submit: string;
}

const LoginScreen = () => {
  const { user } = useParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const { control, handleSubmit, setValue } = useForm<FormData>();

  const [isSubmitting, setIsSubmitting] = useState<boolean>();

  const onSubmit = async (formData: FormData) => {
    const { userIdOrEmail, password } = formData;
    setIsSubmitting(true);
    await axios({
      method: 'post',
      url: `https://leavemangement.onrender.com/apiv1/${user}/login`,
      data: {
        email: userIdOrEmail,
        password: password,
      },
    })
      .then(async (res) => {
        const {
          data: { token, role },
        } = res;
        setAuthCookie(token);
        dispatch(saveUserRoleResponse(role));
        if (role === 'FACULTY') {
          dispatch(getAllFacultyApplications(token));
        } else if (role === 'STUDENT') {
          dispatch(getAllStudentApplications(token));
        }
        navigate('/');
      })
      .catch((e) => {
        setValue('submit', e);
        ErrorService.notify('Problem in fetching request token', e);
      })
      .finally(() => {
        setIsSubmitting(false);
        navigate('/');
      });
  };

  return (
    <Layout>
      <div className='px-4 py-6 flex items-center justify-center'>
        <div className='bg-white flex flex-col items-start justify-center md:w-1/2 w-full md:shadow-xl rounded-2xl py-6'>
          <h1 className='text-xl font-bold text-primary my-3 self-center'>
            Login
          </h1>
          <div className='overflow-y-scroll w-full md:px-12 px-4'>
            <div className='mt-5'>
              <ControlledTextInput<FormData, 'userIdOrEmail'>
                name='userIdOrEmail'
                label='UserId or Email'
                control={control}
                placeholder='Please enter id or email'
                shouldUnregister={false}
                rules={{
                  required: 'Please enter your id or email',
                }}
                isRequired
              />
            </div>
            <div className='mt-5'>
              <ControlledTextInput<FormData, 'password'>
                label='Password'
                name='password'
                control={control}
                shouldUnregister={false}
                rules={{
                  required: 'Please enter password',
                  ...PASSWORD_VALIDATIONS,
                }}
                type='password'
                isRequired
              />
            </div>
          </div>
          <div className='mt-5 w-full flex flex-col items-end md:px-12 px-4 py-3 space-y-3'>
            <span>
              Not a User?{' '}
              <button
                onClick={() => navigate('/register')}
                className='font-sans text-primary text-base leading-5 font-medium'
              >
                Register
              </button>
            </span>
            <Button
              label='Login'
              onClick={handleSubmit(onSubmit)}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginScreen;
