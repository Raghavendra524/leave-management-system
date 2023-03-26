import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import ControlledTextInput from '../components/controlled-inputs/ControlledTextInput';
import Layout from '../components/Layout';
import { PASSWORD_VALIDATIONS } from '../utils/validations';

interface FormData {
  userIdOrEmail: string;
  password: string;
}

const LoginScreen = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {
    console.log('Data:', formData);
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
            <Button label='Login' onClick={handleSubmit(onSubmit)} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginScreen;
