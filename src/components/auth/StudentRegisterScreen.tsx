import React from 'react';
import { useForm } from 'react-hook-form';
import { BranchesEnum } from '../../types';
import { getSpecializationValues } from '../../utils/RegisterUtils';
import { capitalizeEnum } from '../../utils/StringUtils';
import {
  EMAIL_VALIDATIONS,
  PASSWORD_VALIDATIONS,
  PHONE_NUMBER_VALIDATIONS,
} from '../../utils/validations';
import Button from '../Button';
import ControlledHTMLSelectInput from '../controlled-inputs/ControlledHTMLSelectInput';
import ControlledTextInput from '../controlled-inputs/ControlledTextInput';

interface StudentRegisterScreenProps {}

interface FormData {
  studentId: string;
  studentName: string;
  mobileNumber: string;
  email: string;
  department: string;
  facultyId: string;
  degree: string;
  specialization: string;
  entrance: string;
  password: string;
  cPassword: string;
}

const StudentRegisterScreen: React.FC<StudentRegisterScreenProps> = () => {
  const { control, handleSubmit, getValues, watch } = useForm<FormData>();

  const spyDepartment = watch('department');

  const onSubmit = (formData: FormData) => {
    console.log('Data:', formData);
  };

  return (
    <div className='px-4 py-6 flex items-center justify-center'>
      <div className='bg-white flex flex-col items-start justify-center md:w-1/2 w-full md:shadow-xl rounded-2xl'>
        <h1 className='text-xl font-bold text-primary my-3 self-center'>
          Register
        </h1>
        <div className='overflow-y-scroll w-full px-4 py-6'>
          <div className='mt-5'>
            <ControlledTextInput<FormData, 'studentId'>
              name='studentId'
              label='Student Id'
              control={control}
              placeholder='Please enter Id'
              shouldUnregister={false}
              rules={{
                required: 'Please enter your Id',
              }}
              isRequired
            />
          </div>
          <div className='mt-5'>
            <ControlledTextInput<FormData, 'studentName'>
              label='Student Full Name'
              name='studentName'
              control={control}
              placeholder='Eg:John Doe'
              shouldUnregister={false}
              rules={{
                required: 'Please enter your fullName',
              }}
              isRequired
            />
          </div>
          <div className='mt-5'>
            <ControlledTextInput<FormData, 'mobileNumber'>
              label='Mobile Number'
              name='mobileNumber'
              control={control}
              placeholder='+91 9092929292'
              shouldUnregister={false}
              rules={{
                maxLength: {
                  value: 10,
                  message: 'Length should not exceed 10 digits',
                },
                minLength: { value: 10, message: 'Mobile must be 10 digits' },
                required: 'Please enter your mobile number',
                ...PHONE_NUMBER_VALIDATIONS,
              }}
              inputMode='numeric'
              type='number'
              isRequired
            />
          </div>
          <div className='mt-5'>
            <ControlledTextInput<FormData, 'email'>
              label='Email'
              name='email'
              control={control}
              placeholder='Eg: test@example.com'
              shouldUnregister={false}
              rules={{
                required: 'Please enter your email',
                ...EMAIL_VALIDATIONS,
              }}
              type='email'
              inputMode='email'
              isRequired
            />
          </div>
          <div className='mt-5'>
            <ControlledHTMLSelectInput<FormData, 'department'>
              name='department'
              control={control}
              label='Department'
              placeholder='Select Department'
              rules={{ required: 'Please select department' }}
              options={[
                { label: 'Select', value: '' },
                ...Object.values(BranchesEnum).map((b) => ({
                  label: capitalizeEnum(b),
                  value: b,
                })),
              ]}
            />
          </div>
          <div className='mt-5'>
            <ControlledHTMLSelectInput<FormData, 'facultyId'>
              name='facultyId'
              control={control}
              label='Faculty'
              placeholder='Select'
              rules={{ required: 'Please select your faculty' }}
              options={[
                { label: 'Select', value: '' },
                { label: 'Padmabushan', value: '001' },
                { label: 'Murali', value: '002' },
              ]}
              isRequired
            />
          </div>
          <div className='mt-5'>
            <ControlledHTMLSelectInput<FormData, 'degree'>
              name='degree'
              control={control}
              label='Degree'
              placeholder='Select'
              defaultValue='MTech'
              rules={{ required: 'Please select your degree' }}
              options={[{ label: 'Master of Technology', value: 'MTech' }]}
              isRequired
              readOnly
            />
          </div>
          <div className='mt-5'>
            <ControlledHTMLSelectInput<FormData, 'specialization'>
              name='specialization'
              control={control}
              label='Specialization'
              placeholder='Select'
              rules={{ required: 'Please select your Specialization' }}
              options={[
                { label: 'Select', value: '' },
                ...getSpecializationValues[
                  (spyDepartment as unknown as BranchesEnum) ?? BranchesEnum.CSE
                ].map((spe) => ({
                  label: capitalizeEnum(spe.label)!,
                  value: spe.value,
                })),
              ]}
              isRequired
            />
          </div>
          <div className='mt-5'>
            <ControlledHTMLSelectInput<FormData, 'entrance'>
              name='entrance'
              control={control}
              label='Entrance'
              placeholder='Select'
              rules={{ required: 'Please select your entrance' }}
              options={[
                { label: 'Select', value: '' },
                { label: 'Gate', value: 'GATE' },
                { label: 'Self-sponsored', value: 'SELF_SPONSORED' },
              ]}
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
          <div className='mt-5'>
            <ControlledTextInput<FormData, 'cPassword'>
              label='Confirm Password'
              name='cPassword'
              control={control}
              shouldUnregister={false}
              rules={{
                required: 'Please re-enter your password',
                validate: (value) =>
                  getValues().password !== value
                    ? 'Passwords do not match'
                    : undefined,
              }}
              type='password'
              isRequired
            />
          </div>
        </div>
        <div className='mt-5 w-full flex justify-end px-4 py-5'>
          <Button label='Register' onClick={handleSubmit(onSubmit)} />
        </div>
      </div>
    </div>
  );
};

export default StudentRegisterScreen;