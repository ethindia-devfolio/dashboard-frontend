import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../partials/Header';
import notFound from '../images/notFound.png';
import axios from 'axios';

function SelectEndpoint() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [createEndpoint, setCreateEndpoint] = useState(false);
  const [endpoints, setEndpoints] = useState([]);
  const [csvFile, setCsvFile] = useState(null);
  // Fetch endpoints from backend
  useEffect(() => {
    const fetchEndpoints = async () => {
      const response = await axios.get('http://0.0.0.0:8000/data_sources');
      // fetch the endpoints from the response
      const endpoints = response.data.map((endpoint) => endpoint.name);
      setEndpoints(endpoints);
    };
    fetchEndpoints();
  }, []);

  const navigate = useNavigate();

  const handleEndpointClick = (name) => {
    navigate(`/transformation?endpoint=${name}`);
  };

  // Add state for form inputs
  const [formData, setFormData] = useState({
    name: '',
    ip: '',
    extra: ''
  });

  const [uploadFormData, setUploadFormData] = useState({
    endpointName: '',
    file: null
  });

  // Add handler for input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
    [e.target.name]: e.target.value
  });
};

  // Add handler for upload input changes and file upload
  const handleUploadInput = (e) => {
    setUploadFormData({
      ...uploadFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileUpload = (e) => {  
    const file = e.target.files[0];  
    if (file) {  
      setCsvFile(file); // Store the file object directly  
    }  
  };  


  const handleCreateEndpoint = async (data_source_name) => {
    const response = await axios.post('http://0.0.0.0:8000/create', {
      data_source_name: data_source_name
    });

    console.log(response);
    // Fetch endpoints again after creating a new one
    const fetchResponse = await axios.get('http://0.0.0.0:8000/data_sources');
    const updatedEndpoints = fetchResponse.data.map((endpoint) => endpoint.name);
    setEndpoints(updatedEndpoints);
    setCreateEndpoint(false);
  }


  // Add new function to handle CSV upload
const handleCsvUpload = async (e) => {
  e.preventDefault();
  if (!csvFile) {
    console.error('No CSV file selected');
    return;
  }

  try {
    const formData = new FormData();
    formData.append('file', csvFile); // Append the file object
    formData.append('endpoint_name', uploadFormData.endpointName); // Add endpoint name to request

    const response = await axios.post('http://0.0.0.0:8000/data', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('File uploaded successfully:', response.data);

    // Refresh endpoints list after successful upload
    const fetchResponse = await axios.get('http://0.0.0.0:8000/data_sources');
    const updatedEndpoints = fetchResponse.data.map((endpoint) => endpoint.name);
    setEndpoints(updatedEndpoints);
    setCreateEndpoint(false);
  } catch (error) {
    console.error('Error uploading CSV:', error);
  }
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
                onClick={() => {setCreateEndpoint(!createEndpoint);}}
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
                          className="border px-4 py-4 text-gray-800 hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-300 cursor-pointer tracking-wider"
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
                  <label htmlFor="name" className="px-2 py-2 text-gray-700 dark:text-gray-200 tracking-wider pb-6 text-left text-sm uppercase">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 text-gray-800 dark:text-gray-200 dark:bg-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="ip" className="px-2 py-2 text-gray-700 tracking-wider dark:text-gray-200 pb-6 text-left text-sm uppercase">
                    IP Address
                  </label>
                  <input
                    type="text"
                    id="ip"
                    name="ip"
                    value={formData.ip}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 text-gray-800 dark:text-gray-200 dark:bg-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter IP address"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="extra" className="px-2 py-2 text-gray-700 tracking-wider dark:text-gray-200 pb-6 text-left text-sm uppercase">
                    Connection URI
                  </label>
                  <input
                    type="text"
                    id="extra"
                    name="extra"
                    value={formData.extra}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 text-gray-800 dark:text-gray-200 dark:bg-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter connection URI"
                  />
                </div>

                <div>
                  <button
                    className="btn-xl bg-gray-700 dark:bg-gray-200 text-white dark:text-gray-800 shadow-sm shadow-black/[0.08] rounded-full p-2 hover:bg-gray-600 hover:dark:bg-gray-300 w-full mt-4"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCreateEndpoint(formData.name);
                    }}
                  >
                    Create New Endpoint
                  </button>
                </div>
              </form>
            </div>
            <div className="flex align-center justify-center">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 inline text-md font-thin tracking-wide">
                    OR
                </h2>
            </div>
            <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 items-center m-6 w-full justify-center text-center">
              <div className="sm:flex sm:justify-between mb-8 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg rounded-xl p-6">
                <div className="mb-4 sm:mb-0 w-full">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 inline text-md font-thin tracking-wide">
                    UPLOAD ENDPOINT CSV
                  </h2>
                   <div className="mb-4">
                  <input
                    type="text"
                    id="endpointName"
                    name="endpointName"
                    value={uploadFormData.endpointName}
                    onChange={handleUploadInput}
                    className="w-full px-4 py-2 text-gray-800 dark:text-gray-200 dark:bg-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your name"
                  />
                </div>
                  <div className='block w-full p-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mt-4'>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                  />
                  </div>
                  <div>
                  <button
                    className="btn-xl bg-gray-700 dark:bg-gray-200 text-white dark:text-gray-800 shadow-sm shadow-black/[0.08] rounded-full p-2 hover:bg-gray-600 hover:dark:bg-gray-300 w-full mt-4"
                    onClick={handleCsvUpload}
                  >
                    Upload and Create
                  </button>
                </div>
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
