import React from 'react';
import { useNavigate } from 'react-router-dom';
import Guide from './Guide'; 

function Home() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/app'); 
  };

  const handleGuide = () => {
    navigate('/guide'); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-2xl text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Stressr</h1>
        <p className="text-gray-600 text-lg mb-8">
          Stressr is a powerful tool designed for competitive programming. It helps you stress test 
          your solutions under various challenging test cases, ensuring your algorithms can handle 
          edge cases and large inputs efficiently.
        </p>

        <div className="space-x-4">
          <button
            onClick={handleGetStarted}
            className="bg-blue-500 text-white font-bold py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Get Started
          </button>
          <button
            onClick={handleGuide}
            className="bg-green-500 text-white font-bold py-2 px-6 rounded-md hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-300"
          >
            Guide
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
