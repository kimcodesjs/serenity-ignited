import React from 'react';

const AccessDenied = ({ adminOnly }) => {
  return adminOnly ? (
    <h1>This route is restricted!</h1>
  ) : (
    <>
      <h1>Access Denied</h1>
      <h2>Please login!</h2>
    </>
  );
};

export default AccessDenied;
