import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import AccessDenied from './AccessDenied';

const RequireAdmin = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user && user.role === 'admin' ? (
    children
  ) : (
    <AccessDenied adminOnly={true} />
  );
};

export default RequireAdmin;
