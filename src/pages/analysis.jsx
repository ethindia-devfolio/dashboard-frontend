import React, { useState, useEffect } from 'react';

import Header from '../partials/Header';
import DashboardCard01 from '../partials/dashboard/DashboardCard01';
import DashboardCard02 from '../partials/dashboard/DashboardCard02';
import DashboardCard03 from '../partials/dashboard/DashboardCard03';

import DashboardCard09 from '../partials/dashboard/DashboardCard09';
import DashboardCard11 from '../partials/dashboard/DashboardCard11';
import DashboardCard13 from '../partials/dashboard/DashboardCard13';
import loading from '../images/loader.gif';

function Analysis() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const queryParams = new URLSearchParams(window.location.search);
  const trans = queryParams.get('trans');
  const location = queryParams.get('location');
  const date = queryParams.get('date');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col h-screen items-center justify-center">
        <div
        className="h-1/2 w-1/2 "
        style={{
          backgroundImage: `url(${loading})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      />
      <div className="mb-4 sm:mb-0 p-2">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 block text-md font-thin tracking-wide uppercase">
          running through fluence pipeline...
        </h2>
      </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <div className="sm:flex sm:justify-between sm:items-center mb-8">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-3xl text-gray-800 dark:text-gray-100 block uppercase tracking-wider">
                Analysis for {location} in {date}
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-6">
            <DashboardCard01 />
            <DashboardCard02 />
            <DashboardCard03 />
            <DashboardCard09 />
            <DashboardCard11 />
            <DashboardCard13 />
          </div>
        </div>
      </div>
    </div>
  );
}

export { Analysis };
