import React from 'react';
import displayData from '../../displayData.json';

function DashboardCard13() {
  return (
    <div className="col-span-full xl:col-span-12 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Analysis Report</h2>
      </header>
      <div className="p-3">

        {/* Card content */}
        {/* "Today" group */}
        <div>
          <ul className="my-1">
            {/* Item */}
            <li className="flex px-2">
              <div className="grow flex items-center border-b border-gray-100 dark:border-gray-700/60 text-md py-2">
                <div className="grow flex justify-between">
                  <div className="self-center">
                    {displayData.report}
                  </div>
                </div>
              </div>
            </li>
            {/* Item */}

          </ul>
        </div>

      </div>
    </div>
  );
}

export default DashboardCard13;
