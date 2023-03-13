import React from 'react';
import AccessDenied from './AccessDenied';

const RequireAdmin = ({ children, isAdmin }) => {
  return isAdmin ? children : <AccessDenied adminOnly={true} />;
};

export default RequireAdmin;
