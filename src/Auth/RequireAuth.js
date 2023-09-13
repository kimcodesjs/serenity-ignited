import React from 'react';
import AccessDenied from '/AccessDenied';

const RequireAuth = ({ isAuthed, children }) => {
  return isAuthed === true ? children : <AccessDenied />;
};

export default RequireAuth;
