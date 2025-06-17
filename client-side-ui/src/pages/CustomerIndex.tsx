import React from 'react';
import { Navigate } from 'react-router-dom';

const CustomerIndex = () => {
  return <Navigate to="/order" replace />;
};

export default CustomerIndex;