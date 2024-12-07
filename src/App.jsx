// App.js
import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import './css/style.css';
import './charts/ChartjsConfig';

// Import pages
import {Dashboard as Dashboard} from './pages/Dashboard';
import {SelectEndpoint as SelectEndpoint} from './pages/select-endpoint';
import {Transformations as Transformations} from './pages/transformations';
import {Analysis as Analysis} from './pages/analysis';

function App() {
  const location = useLocation();

  useEffect(() => {
    // Disable smooth scroll on route change, scroll to top
    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scrollTo(0, 0); // Scroll to top of the page
    // Re-enable smooth scroll after a short delay
    setTimeout(() => {
      document.querySelector('html').style.scrollBehavior = '';
    }, 0);
  }, [location.pathname]); // Triggers when the route changes

  return (
    <>
      <Routes>
        <Route path="/*" element={<Dashboard />} />
        <Route path="/select-endpoint" element={<SelectEndpoint />} />
        <Route path="/transformation" element={<Transformations />} />
        <Route path="/analysis" element={<Analysis />} />
      </Routes>
    </>
  );
}

// Ensure this is the default export
export default App;
