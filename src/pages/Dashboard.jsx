import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../partials/Header';
import dashboardGif from '../images/dashboardGif.webp';

function Dashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleTransformationClick = () => {
    navigate(`/select-endpoint`);
  };

  return (
<div className="flex flex-col h-screen overflow-hidden relative">
  <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

  <div className="w-full h-full flex justify-center">
    <div className="w-4/5 h-5/6 rounded-xl  flex ">

      {/* Centered GIF */}
      <div
        className="absolute h-4/5 w-2/3 left-1/3 flex "
        style={{
          backgroundImage: `url(${dashboardGif})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      />

<div className="w-3/4 rounded-xl bg-gray-200 flex flex-col justify-center p-16 h-full">
  <div className="mb-4 sm:mb-0 pr-48">
    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 inline text-md font-thin tracking-wide uppercase">
      To achieve the fade-in effect for the "Get Started" button, ensure the button has the correct initial opacity and animation styles. Here's the corrected implementation:
    </h2>
  </div>
  <div className="flex gap-4 mt-16">
    <button
      className="w-1/3 h-16 btn-xl bg-gray-700 text-white shadow-sm rounded-full p-2 hover:bg-gray-600 uppercase tracking-wider"
      onClick={handleTransformationClick}
    >
      Get Started
    </button>
    <button
      className="w-1/3 h-16 btn-xl border-2 border-gray-700 text-gray-700 shadow-sm rounded-full p-2 hover:bg-gray-100 hover:border-gray-600 uppercase tracking-wider"
      onClick={handleTransformationClick}
    >
      GitHub ReadMe
    </button>
  </div>
</div>

    </div>
  </div>
</div>

  );
}

export { Dashboard };
