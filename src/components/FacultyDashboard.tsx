import React, { useState } from 'react';
import { DefaultFacultyResponse } from '../fixtures/api/DefaultFacultyResponse';
import { StudentResponse } from '../types';
import Button from './Button';
import Layout from './Layout';

const StudentDashboard = () => {
  const [userRequest, setUserRequest] =
    useState<Omit<StudentResponse, 'faculty_id' | 'leaves' | 'user_type'>>();

  return (
    <Layout>
      <div className='w-full flex items-center justify-center'>
        <div className='flex flex-col items-start w-5/6'>
          <div className='flex flex-row justify-between items-center px-4 py-6'>
            <h1 className='font-sans font-semibold text-dark-9 text-lg'>
              My Student
            </h1>
          </div>
          <table className='w-full'>
            <tr>
              <th>Student Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Degree</th>
              <th>Department</th>
              <th>Specialization</th>
              <th>Entrance</th>
            </tr>
            {(DefaultFacultyResponse.request || []).map((user) => {
              const {
                request: { desc, from, status, title, to },
                student: {
                  student_name,
                  degree,
                  department,
                  email_id,
                  mobile_number,
                  entrance,
                  specialization,
                  student_id,
                },
              } = user;
              return (
                <React.Fragment>
                  <tr
                    onClick={() => {
                      if (
                        !!userRequest &&
                        student_id === userRequest.student_id
                      ) {
                        setUserRequest(undefined);
                      } else setUserRequest(user.student);
                    }}
                    className='w-full cursor-pointer'
                  >
                    <td>{student_name}</td>
                    <td>{email_id}</td>
                    <td>{mobile_number}</td>
                    <td>{degree}</td>
                    <td>{department}</td>
                    <td>{specialization}</td>
                    <td>{entrance}</td>
                  </tr>
                  {userRequest && userRequest.student_id === student_id && (
                    <>
                      <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Leave From</th>
                        <th>Leave To</th>
                        <th>Status</th>
                      </tr>
                      <tr>
                        <td>{title}</td>
                        <td>{desc}</td>
                        <td>{from}</td>
                        <td>{to}</td>
                        <td>
                          <Button label={status} onClick={() => undefined} />
                        </td>
                      </tr>
                    </>
                  )}
                </React.Fragment>
              );
            })}
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default StudentDashboard;
