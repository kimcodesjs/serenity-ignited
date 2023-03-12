import React, { useState } from 'react';
import Dashboard from './Dashboard';

const Admin = () => {
  // need to implement route protection to admin users
  return (
    <div>
      <Dashboard />
    </div>
  );
};

export default Admin;
