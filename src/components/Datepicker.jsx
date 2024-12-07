import React, { useState, useEffect } from 'react';

const MonthYearSelector = ({ onDateChange }) => {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState("");

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  useEffect(() => {
    if (month && year) {
      onDateChange(`${month} ${year}`);
    }
  }, [month, year, onDateChange]);

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
    if (!event.target.value) {
      setYear("2014");
    }
  };

  const handleYearChange = (event) => {
    const newYear = parseInt(event.target.value);
    if (newYear >= 2007 && newYear <= 2014) {
      setYear(newYear);
    }
  };

  return (
    <div className="flex flex-col items-center bg-slate-100 dark:bg-gray-700 p-6 rounded-lg shadow-lg mb-6">

      <div className="flex gap-6 items-center">
        <select
          className="border border-gray-300 rounded-lg pr-20 py-2 text-gray-800 dark:text-gray-200 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={month}
          placeholder="Select Month"
          onChange={handleMonthChange}
        >
          <option value="">Select Month</option>
          {months.map((m, index) => (
            <option key={index} value={m}>{m}</option>
          ))}
        </select>

        <input
          type="number"
          className="border border-gray-300 rounded-lg px-3 py-2 text-gray-800 dark:text-gray-200 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={year}
          onChange={handleYearChange}
          placeholder="Select Year"
          min="2007"
          max="2014"
          disabled={!month}
        />
      </div>

      <div className="mt-4 text-gray-800 dark:text-gray-200">
        {month && year ? (
          <p>
            <span className="font-semibold">{month} {year}</span>
          </p>
        ) : (
          <p className="text-gray-500">No selection made</p>
        )}
      </div>
    </div>
  );
};

export default MonthYearSelector;
