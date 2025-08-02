import React from 'react';

const Spinner = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
     <div className="w-14 h-14 border-4 border-indigo-500 border-dashed rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
