import React from 'react';
import { useNavigate } from 'react-router';
import errorImg from '../assets/404 Error-amico.png';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <img 
        src={errorImg} 
        alt="404 Error - Page Not Found" 
        className="max-w-full h-auto w-[320px] sm:w-[400px] md:w-[500px] mb-8"
      />
      <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">Oops! Page Not Found.</h1>
      <p className="text-gray-600 text-center max-w-md mb-6">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <button 
        onClick={() => navigate('/')}
        className="btn bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition "
      >
        Go to Home
      </button>
    </div>
  );
};

export default ErrorPage;
