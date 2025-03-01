import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404 - Page Not Found</h1>
        <p className="text-xl text-gray-700 mb-2">
          We're sorry, but the page you are looking for does not exist.
        </p>
        <p className="text-lg text-gray-600">
          Please check the URL or return to the{' '}
          <Link to="/" className="text-blue-500 hover:underline">
            homepage
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default NotFound;