import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DefaultLoader from './components/DefaultLoader';
import DecideAuthRoutes from './routes/DecideAuthRoutes';
import { getAllStudentApplications } from './slices/AuthSlice';
import { AppDispatch, RootState } from './types';
import { getAuthCookie } from './utils/ApiUtils';

function App() {
  const dispatch: AppDispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);

  const { appLoading } = useSelector((state: RootState) => state.auth);

  console.log('AppLoading', appLoading);

  const fetchAuth = useCallback(async () => {
    const token = getAuthCookie();
    if (!!token) {
      await dispatch(getAllStudentApplications(token, true));
    }
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    fetchAuth();
  }, [fetchAuth]);

  if (loading || appLoading) {
    return (
      <div className='h-screen w-screen'>
        <DefaultLoader />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<DecideAuthRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
