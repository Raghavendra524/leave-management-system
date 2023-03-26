import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/Register';
import Route404 from '../screens/Route404';

const GuestRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/login' />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='*' element={<Route404 />} />
    </Routes>
  );
};

export default GuestRoutes;
