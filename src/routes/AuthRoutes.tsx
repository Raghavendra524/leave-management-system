import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomeScreen from '../screens/HomeScreen';
import Route404 from '../screens/Route404';

const AuthRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/dashboard' />} />
      <Route path='/dashboard/*' element={<HomeScreen />} />
      <Route path='*' element={<Route404 />} />
    </Routes>
  );
};

export default AuthRoutes;
