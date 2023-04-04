import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { RootState } from '../types';
import AuthRoutes from './AuthRoutes';
import GuestRoutes from './GuestRoutes';

const DecideAuthRoutes: React.FC = () => {
  const { role } = useSelector((state: RootState) => state.auth);

  return (
    <Routes>
      <Route path='*' element={!!role ? <AuthRoutes /> : <GuestRoutes />} />
    </Routes>
  );
};

export default DecideAuthRoutes;
