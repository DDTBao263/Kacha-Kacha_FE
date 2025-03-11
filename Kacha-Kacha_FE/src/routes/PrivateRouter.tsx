import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { RootState } from '../redux/store';

interface Props {
  allowedUserTypes: string[];
}

export const PrivateRoute: React.FC<Props> = ({ allowedUserTypes }) => {
    const userType = useSelector((state: RootState) => state.auth.user?.userType);
    const isAllowed = allowedUserTypes.includes(userType || '');
    console.log(userType)
    if (!isAllowed) {
      return <Navigate to="/auth/signin" />;
    }
    return <Outlet />;
}; 