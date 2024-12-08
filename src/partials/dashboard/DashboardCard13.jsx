import React from 'react';

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
                    EcoChain addresses the challenge of accessing and sharing comprehensive environmental data in a secure, transparent, and decentralized manner.
                    Traditional environmental data repositories often suffer from issues such as data silos, inaccessibility, and centralized control. This limits
                    collaboration and slows down the pace of global environmental initiatives. EcoChain enables:
                    Researchers, policymakers, and NGOs to access accurate and real-time environmental data to make informed decisions.
                    Real-time monitoring and analysis of environmental factors like climate change, pollution, and biodiversity loss.
                    A collaborative space for citizens and organizations to contribute and validate environmental data, ensuring that the data is trustworthy and transparent.
                    A decentralized solution that reduces the risks of data manipulation and centralization.
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
