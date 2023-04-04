import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DefaultLoader from './components/DefaultLoader';
import DecideAuthRoutes from './routes/DecideAuthRoutes';
import { getAllFacultyApplications } from './slices/AuthSlice';
import { AppDispatch } from './types';
import { getAuthCookie } from './utils/ApiUtils';

function App() {
  const dispatch: AppDispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchAuth = useCallback(async () => {
    const token = getAuthCookie();
    if (!!token) {
      await dispatch(getAllFacultyApplications(token));
    }
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    fetchAuth();
  }, [fetchAuth]);

  if (loading) {
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
