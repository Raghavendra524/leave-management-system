import { useSelector } from 'react-redux';
import FacultyDashboard from '../components/FacultyDashboard';
import StudentDashboard from '../components/StudentDashboard';
import { RootState, UserTypeEnum } from '../types';
import Route404 from './Route404';

const HomeScreen = () => {
  const {
    userResponse: { data: userDetails },
  } = useSelector((state: RootState) => state.auth);

  if (userDetails?.user_type === UserTypeEnum.STUDENT) {
    return <StudentDashboard />;
  }

  if (userDetails?.user_type === UserTypeEnum.FACULTY) {
    return <FacultyDashboard />;
  }

  return <Route404 />;
};

export default HomeScreen;
