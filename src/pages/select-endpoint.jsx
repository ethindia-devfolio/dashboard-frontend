import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../partials/Header';
import endpoints from '../endpoints.json';
import notFound from '../images/notFound.png';

function SelectEndpoint() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [createEndpoint, setCreateEndpoint] = useState(false);

  const navigate = useNavigate();

  const handleEndpointClick = (name) => {
    navigate(`/transformation?endpoint=${name}`);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {!createEndpoint && (
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              <div className="mb-4 sm:mb-0">
                <h1 className="text-3xl text-gray-800 dark:text-gray-100 inline uppercase tracking-wider">
                  Select Endpoint
                </h1>
              </div>
              <button
                className="btn-xl bg-gray-700 dark:bg-gray-200 text-white dark:text-gray-800 shadow-sm shadow-black/[0.08] rounded-full p-4 hover:bg-gray-600 hover:dark:bg-gray-300"
                onClick={() => setCreateEndpoint(!createEndpoint)}
              >
                Create New Endpoint
              </button>
            </div>

            <div
              className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg rounded-xl items-center m-6 p-6"
              style={{
                maxHeight: '70vh',
                overflowY: 'auto',
              }}
            >
              {endpoints && endpoints.length > 0 ? (
                <table className="min-w-full table-auto">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 pb-6 text-left text-sm font-thin tracking-wide">ENDPOINT NAME</th>
                    </tr>
                  </thead>
                  <tbody>
                    {endpoints.map((endpoint, index) => (
                      <tr key={index}>
                        <td
                          className="border px-4 py-2 text-gray-800 hover:text-gray-600 cursor-pointer tracking-wider"
                          onClick={() => handleEndpointClick(endpoint)}
                        >
                          {endpoint}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center text-gray-500">
                  <img src={notFound} alt="Not Found" height="480" width="480" />
                </div>
              )}
            </div>
          </div>
        )}

        {createEndpoint && (
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto flex flex-col justify-center">
            <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg rounded-xl items-center m-6 p-6 w-full">
              <div className="sm:flex sm:justify-between x mb-8 w-full">
                <div className="mb-4 sm:mb-0">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 inline text-md font-thin tracking-wide">
                    CREATE NEW ENDPOINT
                  </h2>
                </div>
                <button
                  className="btn-2xl dark:text-white text-gray-800 shadow-sm shadow-black/[0.08] rounded-full font-bold"
                  onClick={() => setCreateEndpoint(!createEndpoint)}
                >
                  X
                </button>
              </div>

              <form className="w-full">
                <div className="mb-4">
                  <label htmlFor="name" className="px-2 py-2 text-gray-700 tracking-wider pb-6 text-left text-sm uppercase">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-2 text-gray-800 dark:text-gray-200 dark:bg-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="ip" className="px-2 py-2 text-gray-700 tracking-wider pb-6 text-left text-sm uppercase">
                    IP Address
                  </label>
                  <input
                    type="text"
                    id="ip"
                    name="ip"
                    className="w-full px-4 py-2 text-gray-800 dark:text-gray-200 dark:bg-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter IP address"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="extra" className="px-2 py-2 text-gray-700 tracking-wider pb-6 text-left text-sm uppercase">
                    Extra
                  </label>
                  <input
                    type="text"
                    id="extra"
                    name="extra"
                    className="w-full px-4 py-2 text-gray-800 dark:text-gray-200 dark:bg-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter additional information"
                  />
                </div>

                <div>
                  <button
                    className="btn-xl bg-gray-700 dark:bg-gray-200 text-white dark:text-gray-800 shadow-sm shadow-black/[0.08] rounded-full p-2 hover:bg-gray-600 hover:dark:bg-gray-300 w-full mt-4"
                    onClick={() => setCreateEndpoint(!createEndpoint)}
                  >
                    Create New Endpoint
                  </button>
                </div>
              </form>
            </div>
            <div className="flex align-center justify-center">
                <hr />
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 inline text-md font-thin tracking-wide">
                    OR
                </h2>
                <hr />
            </div>
            <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg rounded-xl items-center m-6 p-6 w-full">
              <div className="sm:flex sm:justify-between x mb-8 w-full">
                <div className="mb-4 sm:mb-0">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 inline text-md font-thin tracking-wide">
                    UPLOAD ENDPOINT
                  </h2>
                </div>
              </div>


            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export { SelectEndpoint };
