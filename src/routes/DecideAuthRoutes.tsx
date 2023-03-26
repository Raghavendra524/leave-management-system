import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthRoutes from './AuthRoutes';
import { useSelector } from 'react-redux';
import GuestRoutes from './GuestRoutes';
import { RootState } from '../types';

const DecideAuthRoutes: React.FC = () => {
  const {
    userResponse: { data: userDetails },
  } = useSelector((state: RootState) => state.auth);

  return (
    <Routes>
      <Route
        path='*'
        element={!!userDetails ? <AuthRoutes /> : <GuestRoutes />}
      />
    </Routes>
  );
};

export default DecideAuthRoutes;
