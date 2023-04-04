import classNames from 'classnames';
import { DateTime } from 'luxon';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../types';
import { capitalizeEnum } from '../utils/StringUtils';
import Button from './Button';
import Layout from './Layout';

const StudentDashboard = () => {
  const navigate = useNavigate();

  const { studentApplications } = useSelector((state: RootState) => state.auth);

  return (
    <Layout>
      <div className='w-full flex items-center justify-center'>
        <div className='flex flex-col items-start w-5/6'>
          <div className='w-full flex flex-row justify-between items-center py-3'>
            <h1 className='font-sans font-semibold text-dark-9 text-lg'>
              My Leaves
            </h1>
            <Button
              label='Apply for Leave'
              onClick={() => navigate('/dashboard/apply')}
            />
          </div>
          <table className='w-full'>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Leave From</th>
              <th>Leave To</th>
              <th>Status</th>
            </tr>
            {(studentApplications || []).map((leave) => {
              return (
                <tr>
                  <td>{leave.leave_type}</td>
                  <td>{leave.reason}</td>
                  <td>
                    {DateTime.fromISO(leave.starting_date).toFormat(
                      'yyyy LLL dd'
                    )}
                  </td>
                  <td>
                    {DateTime.fromISO(leave.ending_date).toFormat(
                      'yyyy LLL dd'
                    )}
                  </td>
                  <td
                    className={classNames(
                      leave.status === 'pending' && 'text-danger'
                    )}
                  >
                    {capitalizeEnum(leave.status)}
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default StudentDashboard;
