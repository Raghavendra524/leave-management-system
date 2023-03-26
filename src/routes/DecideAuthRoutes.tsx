import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthRoutes from './AuthRoutes';
import GuestRoutes from './GuestRoutes';

const DecideAuthRoutes: React.FC = () => {
  const isGuest = true;

  return (
    <Routes>
      <Route path='*' element={isGuest ? <GuestRoutes /> : <AuthRoutes />} />
    </Routes>
  );
};

export default DecideAuthRoutes;
