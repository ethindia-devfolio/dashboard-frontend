import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../partials/Header';
import notFound from '../images/notFound.png';
import Map from '../components/Map';
import DatePicker from '../components/Datepicker';
import optionGhost from '../images/optionGhost.png';
import optionGhost2 from '../images/optionGhost2.png';
import optionGhost3 from '../images/optionGhost3.png';
import optionGhost4 from '../images/optionGhost4.png';
import customGhost from '../images/customGhost.png';
import axios from 'axios';

function Transformations() {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [createTransformation, setCreateTransformation] = useState(false);
    const [visualise, setVisualise] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [endpointVersions, setEndpointVersions] = useState([]);
    const [transformationName, setTransformationName] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(window.location.search);
    const endpoint = queryParams.get('endpoint');


    useEffect(() => {
        const fetchEndpointVersions = async () => {
            const response = await axios.get(`http://0.0.0.0:8000/data_sources/${endpoint}/versions`);
            console.log(response.data);
            const versions = response.data.map((version) => ({name: version.name, type: version.transformation_type}));
            setEndpointVersions(versions);
        };
        fetchEndpointVersions();
    }, [endpoint]);

    const handleTransformationClick = () => {
        console.log(selectedDate, selectedLocation);
        navigate(`/analysis?trans=${encodeURIComponent(endpoint)}&location=${encodeURIComponent(selectedLocation)}&date=${encodeURIComponent(selectedDate)}`);
    };

    const onDateChange = (date) => {
        setSelectedDate(date);
        return date;
    }

    const onLocationSelect = (location) => {
        setSelectedLocation(location);
        return location;
    }

    const handleSubmitTransformation = async () => {
        try {
            await axios.post(`http://0.0.0.0:8000/transformations`, {
                name: transformationName,
                type: selectedType,
                data_source_name: endpoint
            });
            const fetchResponse = await axios.get(`http://0.0.0.0:8000/data_sources/${endpoint}/versions`);
            const versions = fetchResponse.data.map((version) => ({name: version.name, type: version.type}));
            setCreateTransformation(false);
            setEndpointVersions(versions);
        } catch (error) {
            console.error('Error creating transformation:', error);
        }
    };

    return (
      <div className="flex h-screen overflow-hidden">
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          {!createTransformation && !visualise && (
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              <div className="sm:flex sm:justify-between sm:items-center mb-8">
                <div className="mb-4 sm:mb-0">
                  <h1 className="text-3xl text-gray-800 dark:text-gray-100 block uppercase tracking-wider">
                    Select Transformation Type
                  </h1>
                </div>
                <button
                  className="btn-xl bg-gray-700 dark:bg-gray-200 text-white dark:text-gray-800 shadow-sm shadow-black/[0.08] rounded-full p-4 hover:bg-gray-600 hover:dark:bg-gray-300"
                  onClick={() => setCreateTransformation(!createTransformation)}
                >
                  Create New Transformation
                </button>
              </div>

              <div
                className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg rounded-xl items-center m-6 p-6 dark:text-gray-100 "
                style={{
                  maxHeight: '70vh',
                  overflowY: 'auto',
                }}
              >
                {endpointVersions && endpointVersions.length > 0 ? (
                  <table className="min-w-full table-auto">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 pb-6 text-left text-sm font-thin tracking-wide">TRANSFORMATION NAME</th>
                        <th className="px-4 py-2 pb-6 text-left text-sm font-thin tracking-wide">TYPE</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {endpointVersions.map((endpoint, index) => (
                        <tr className="border px-4 py-2 tracking-wider text-white">
                        <td
                          className="px-4 py-2 text-gray-800 dark:text-gray-100 tracking-wider"

                        >
                          {endpoint.name}
                        </td>
                        <td className="px-4 py-2 text-gray-800 dark:text-gray-100 tracking-wider">
                            {endpoint.type}
                        </td>
                        <td className="px-2 py-2 text-gray-800 tracking-wider flex justify-end">
                            <button
                                className="btn-md bg-gray-700 dark:bg-gray-200 text-white dark:text-gray-800 shadow-sm shadow-black/[0.08] rounded-full p-3 mr-4 hover:bg-gray-600 hover:dark:bg-gray-300 text-sm"
                                onClick={() => setVisualise(!visualise)}
                            >
                                Visualise
                            </button>
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

          {createTransformation && (
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg rounded-xl items-center m-6 p-6 w-full">
                <div className="sm:flex sm:justify-between x mb-8 w-full">
                  <div className="mb-4 sm:mb-0">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 inline text-md font-thin tracking-wide">
                      CREATE NEW TRANSFORMATION
                    </h2>
                  </div>
                  <button
                    className="btn-2xl dark:text-white text-gray-800 shadow-sm shadow-black/[0.08] rounded-full font-bold"
                    onClick={() => setCreateTransformation(!createTransformation)}
                  >
                    X
                  </button>
                </div>

                <div className="w-full mb-6">
                    <input
                        type="text"
                        placeholder="Enter transformation name"
                        value={transformationName}
                        onChange={(e) => setTransformationName(e.target.value)}
                        className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    />
                </div>

                <div className="grid grid-cols-3 gap-16 m-4">
                    <div 
                        className={`w-72 h-72 ${selectedType === 'FILTER_AND_SUMMARISE' ? 'ring-4 ring-blue-500' : ''} bg-gray-700 hover:bg-gray-800 dark:bg-slate-300 rounded-xl hover:dark:bg-slate-200 cursor-pointer dark:text-gray-700 text-gray-300 flex justify-center align-center flex-col`}
                        onClick={() => setSelectedType('FILTER_AND_SUMMARISE')}
                    >
                        <p className="px-4 py-1 text-left text-md font-bold tracking-wide align-left">FILTER AND SUMMARISE</p>
                        <div className="flex justify-center w-full h-64 p-4 pt-10">
                            <img src={optionGhost} alt="Option transformation" />
                        </div>
                    </div>
                    <div 
                        className={`w-72 h-72 ${selectedType === 'FUTURE_PREDICTION' ? 'ring-4 ring-blue-500' : ''} bg-gray-700 hover:bg-gray-800 dark:bg-slate-300 rounded-xl hover:dark:bg-slate-200 cursor-pointer dark:text-gray-700 text-gray-300 flex justify-center align-center flex-col`}
                        onClick={() => setSelectedType('FUTURE_PREDICTION')}
                    >
                        <p className="px-4 py-1 text-left text-md font-bold tracking-wide align-left">FUTURE PREDICTION</p>
                        <div className="flex justify-center w-full h-64 p-4">
                            <img src={optionGhost2} alt="Option transformation"/>
                        </div>
                    </div>
                    <div 
                        className={`w-72 h-72 ${selectedType === 'COMPARE_DATAPOINTS' ? 'ring-4 ring-blue-500' : ''} bg-gray-700 hover:bg-gray-800 dark:bg-slate-300 rounded-xl hover:dark:bg-slate-200 cursor-pointer dark:text-gray-700 text-gray-300 flex justify-center align-center flex-col`}
                        onClick={() => setSelectedType('COMPARE_DATAPOINTS')}
                    >
                        <p className="px-4 py-1 text-left text-md font-bold tracking-wide align-left">COMPARE DATAPOINTS</p>
                        <div className="flex justify-center w-full h-64 pb-4 pt-10">
                            <img src={optionGhost3} alt="Option transformation" />
                        </div>
                    </div>
                    <div 
                        className={`w-72 h-72 ${selectedType === 'CAUSAL_ANALYSIS' ? 'ring-4 ring-blue-500' : ''} bg-gray-700 hover:bg-gray-800 dark:bg-slate-300 rounded-xl hover:dark:bg-slate-200 cursor-pointer dark:text-gray-700 text-gray-300 flex justify-center align-center flex-col`}
                        onClick={() => setSelectedType('CAUSAL_ANALYSIS')}
                    >
                        <p className="px-4 py-1 text-left text-md font-bold tracking-wide align-left">CAUSAL ANALYSIS</p>
                        <div className="flex justify-center w-full h-64 p-4">
                            <img src={optionGhost4} alt="Option transformation"/>
                        </div>
                    </div>
                    <div 
                        className={`w-72 h-72 ${selectedType === 'ADD_CUSTOM' ? 'ring-4 ring-blue-500' : ''} bg-gray-700 hover:bg-gray-800 dark:bg-slate-300 rounded-xl hover:dark:bg-slate-200 cursor-pointer dark:text-gray-700 text-gray-300 flex justify-center align-center flex-col`}
                        onClick={() => setSelectedType('ADD_CUSTOM')}
                    >
                        <p className="px-4 py-1 text-left text-md font-bold tracking-wide align-left">ADD CUSTOM</p>
                        <div className="flex justify-center w-full h-64 p-2">
                            <img src={customGhost} alt="Option transformation" />
                        </div>
                    </div>
                </div>

                <div className="w-full mt-6">
                    <button
                        className="btn-xl bg-gray-700 dark:bg-gray-200 text-white dark:text-gray-800 shadow-sm shadow-black/[0.08] rounded-full p-2 hover:bg-gray-600 hover:dark:bg-gray-300 w-full uppercase h-12 tracking-wider"
                        onClick={handleSubmitTransformation}
                        disabled={!transformationName || !selectedType}
                    >
                        Create Transformation
                    </button>
                </div>
              </div>
            </div>
          )}

        {visualise && (
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg rounded-xl items-center m-6 p-6 w-full">
                <div className="sm:flex sm:justify-between x mb-8 w-full">
                  <div className="mb-4 sm:mb-0">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 inline text-md font-thin tracking-wide">
                      SELECT DATA TO VISUALISE
                    </h2>
                  </div>
                  <button
                    className="btn-2xl dark:text-white text-gray-800 shadow-sm shadow-black/[0.08] rounded-full font-bold"
                    onClick={() => setVisualise(!visualise)}
                  >
                    X
                  </button>
                </div>

                <div className="w-full">
                    <Map onLocationSelect = {onLocationSelect}/>
                    <DatePicker onDateChange={onDateChange}/>
                    <div>
                        <button
                            className="btn-xl bg-gray-700 dark:bg-gray-200 text-white dark:text-gray-800 shadow-sm shadow-black/[0.08] rounded-full p-2 hover:bg-gray-600 hover:dark:bg-gray-300 w-full uppercase h-12 tracking-wider"
                            onClick={() => handleTransformationClick()}
                        >
                            Get Analysis
                        </button>
                    </div>
                </div>

              </div>
            </div>
          )}
        </div>
      </div>
    );
}

export {Transformations};
