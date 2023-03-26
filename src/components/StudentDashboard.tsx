import { useSelector } from 'react-redux';
import { RootState, StudentResponse } from '../types';
import Button from './Button';
import Layout from './Layout';

const StudentDashboard = () => {
  const {
    userResponse: { data: userDetails },
  } = useSelector((state: RootState) => state.auth);

  return (
    <Layout>
      <div className='w-full flex items-center justify-center'>
        <div className='flex flex-col items-start w-5/6'>
          <div className='w-full flex flex-row justify-between items-center py-3'>
            <h1 className='font-sans font-semibold text-dark-9 text-lg'>
              My Leaves
            </h1>
            <Button label='Apply for Leave' />
          </div>
          <table className='w-full'>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Leave From</th>
              <th>Leave To</th>
              <th>Status</th>
            </tr>
            {((userDetails as StudentResponse).leaves || []).map((leave) => {
              const { desc, from, status, title, to } = leave;
              return (
                <tr>
                  <td>{title}</td>
                  <td>{desc}</td>
                  <td>{from}</td>
                  <td>{to}</td>
                  <td>{status}</td>
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
