import React from 'react';
import Tooltip from '../../components/Tooltip';
import BarChart from '../../charts/BarChart02';

import { tailwindConfig } from '../../utils/Utils';

function DashboardCard09(displayData) {

  const avgMaxTemp = displayData.max_temp.reduce((sum, temp) => sum + temp, 0) / displayData.max_temp.length;
  const avgMinTemp = displayData.min_temp.reduce((sum, temp) => sum + temp, 0) / displayData.min_temp.length;

  console.log(avgMaxTemp, avgMinTemp);

  const chartData = {
    labels: [
      '10-01-2014'
    ],
    datasets: [
      {
        label: 'Stack 1',
        data: [avgMaxTemp],
        backgroundColor: tailwindConfig().theme.colors.violet[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.violet[600],
        barPercentage: 0.7,
        categoryPercentage: 0.7,
        borderRadius: 4,
      },
      {
        label: 'Stack 2',
        data: [avgMinTemp],
        backgroundColor: tailwindConfig().theme.colors.violet[200],
        hoverBackgroundColor: tailwindConfig().theme.colors.violet[300],
        barPercentage: 0.7,
        categoryPercentage: 0.7,
        borderRadius: 4,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex items-center">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Avg Max vs Avg Min Temperature</h2>
        <Tooltip className="ml-2" size="lg">
          <div className="text-sm"></div>
        </Tooltip>
      </header>
      <div className="px-5 py-3">
      </div>
      <div className="grow">
        <BarChart data={chartData} width={595} height={248} />
      </div>
    </div>
  );
}

export default DashboardCard09;
