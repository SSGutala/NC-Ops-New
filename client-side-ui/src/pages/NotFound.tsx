
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-4">Oops! The page you're looking for doesn’t exist.</p>
      <Link
        to="/order"
        className="text-blue-400 hover:text-blue-200 underline transition"
      >
        Go back to Order Page
      </Link>
    </div>
  );
};

export default NotFound;
