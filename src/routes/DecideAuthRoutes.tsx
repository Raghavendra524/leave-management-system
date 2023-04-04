import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { getAuthCookie } from '../utils/ApiUtils';
import AuthRoutes from './AuthRoutes';
import GuestRoutes from './GuestRoutes';

const DecideAuthRoutes: React.FC = () => {
  const token = getAuthCookie();

  return (
    <Routes>
      <Route path='*' element={!!token ? <AuthRoutes /> : <GuestRoutes />} />
    </Routes>
  );
};

export default DecideAuthRoutes;
