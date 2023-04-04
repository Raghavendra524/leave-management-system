import axios from 'axios';
import { DateTime } from 'luxon';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import ControlledDatePickerInput from '../components/controlled-inputs/ControlledDatePickerInput';
import ControlledTextInput from '../components/controlled-inputs/ControlledTextInput';
import Layout from '../components/Layout';
import ErrorService from '../services/ErrorService';
import { getAllStudentApplications } from '../slices/AuthSlice';
import { AppDispatch } from '../types';
import { getAuthCookie } from '../utils/ApiUtils';

interface FormData {
  leave_type: string;
  no_of_leaves: number;
  starting_date: Date;
  ending_date: Date;
  reason: string;
  document: any;
}

const ApplyLeave = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const token = getAuthCookie();
  const { control, handleSubmit } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>();

  const onSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    await axios({
      method: 'post',
      url: `https://leavemangement.onrender.com/apiv1/studentaction/newapplication`,
      data: formData,
      headers: { Authorization: 'Bearer ' + token },
    })
      .then(async (res) => {
        console.log('Response:', res.data);
        dispatch(getAllStudentApplications(token!));
      })
      .catch((e) => {
        ErrorService.notify('Problem in fetching request leave', e);
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
            Apply For Leave
          </h1>
          <div className='overflow-y-scroll w-full md:px-12 px-4'>
            <div className='mt-5'>
              <ControlledTextInput<FormData, 'leave_type'>
                name='leave_type'
                label='Leave Type'
                control={control}
                placeholder='Leave Type'
                shouldUnregister={false}
                rules={{
                  required: 'Please enter leave type',
                }}
                isRequired
              />
            </div>
            <div className='mt-5'>
              <ControlledTextInput<FormData, 'no_of_leaves'>
                name='no_of_leaves'
                label='No of Leaves'
                control={control}
                placeholder='No of Leaves'
                inputMode='numeric'
                maxLength={2}
                type='number'
                shouldUnregister={false}
                rules={{
                  required: 'Please enter no of leaves',
                  validate: async (v) => {
                    return v < 0
                      ? 'value should be greater than zero'
                      : undefined;
                  },
                }}
                isRequired
              />
            </div>
            <div className='mt-5'>
              <ControlledDatePickerInput<FormData, 'starting_date'>
                name='starting_date'
                control={control}
                label='Start Date'
                shouldUnregister={false}
                placeholder='E.g. 10/26'
                datePickerConfig={{
                  minDate: DateTime.local().toJSDate(),
                }}
                rules={{
                  required: 'please select start date',
                }}
                isRequired
              />
            </div>
            <div className='mt-5'>
              <ControlledDatePickerInput<FormData, 'ending_date'>
                name='ending_date'
                control={control}
                label='End Date'
                shouldUnregister={false}
                placeholder='E.g. 10/26'
                datePickerConfig={{
                  minDate: DateTime.local().plus({ day: 1 }).toJSDate(),
                }}
                rules={{
                  required: 'please select end date',
                }}
                isRequired
              />
            </div>
            <div className='mt-5'>
              <ControlledTextInput<FormData, 'reason'>
                name='reason'
                label='Reason'
                control={control}
                placeholder='Reason'
                shouldUnregister={false}
                rules={{
                  required: 'Please add a reason',
                }}
                isRequired
              />
            </div>
          </div>
          <div className='mt-5 w-full flex flex-col items-end md:px-12 px-4 py-3 space-y-3'>
            <Button
              label='Apply Leave'
              onClick={handleSubmit(onSubmit)}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ApplyLeave;
