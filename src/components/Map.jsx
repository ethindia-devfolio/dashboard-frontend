import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const AustraliaMap = ({onLocationSelect}) => {
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    const map = L.map('map').setView([-28.2744, 133.7751], 5); // Centered on Australia

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    const cities = [
        { name: 'Albury', lat: -36.0737, lon: 146.9135 },
        { name: 'BadgerysCreek', lat: -33.8915, lon: 150.7252 },
        { name: 'Cobar', lat: -31.4999, lon: 145.8341 },
        { name: 'CoffsHarbour', lat: -30.2963, lon: 153.1135 },
        { name: 'Moree', lat: -29.4640, lon: 149.8415 },
        { name: 'Newcastle', lat: -32.9283, lon: 151.7817 },
        { name: 'NorahHead', lat: -33.2815, lon: 151.5690 },
        { name: 'NorfolkIsland', lat: -29.0408, lon: 167.9547 },
        { name: 'Penrith', lat: -33.7500, lon: 150.6945 },
        { name: 'Richmond', lat: -33.5992, lon: 150.7507 },
        { name: 'Sydney', lat: -33.8688, lon: 151.2093 },
        { name: 'SydneyAirport', lat: -33.9399, lon: 151.1753 },
        { name: 'WaggaWagga', lat: -35.1081, lon: 147.3598 },
        { name: 'Williamtown', lat: -32.7944, lon: 151.8391 },
        { name: 'Wollongong', lat: -34.4278, lon: 150.8931 },
        { name: 'Canberra', lat: -35.2809, lon: 149.1300 },
        { name: 'Tuggeranong', lat: -35.4240, lon: 149.0673 },
        { name: 'MountGinini', lat: -35.5292, lon: 148.7733 },
        { name: 'Ballarat', lat: -37.5622, lon: 143.8503 },
        { name: 'Bendigo', lat: -36.7570, lon: 144.2794 },
        { name: 'Sale', lat: -38.1086, lon: 147.0732 },
        { name: 'MelbourneAirport', lat: -37.6690, lon: 144.8410 },
        { name: 'Melbourne', lat: -37.8136, lon: 144.9631 },
        { name: 'Mildura', lat: -34.2086, lon: 142.1246 },
        { name: 'Nhil', lat: -36.3366, lon: 141.6542 },
        { name: 'Portland', lat: -38.3435, lon: 141.6058 },
        { name: 'Watsonia', lat: -37.7160, lon: 145.0830 },
        { name: 'Dartmoor', lat: -37.9167, lon: 141.2833 },
        { name: 'Brisbane', lat: -27.4698, lon: 153.0251 },
        { name: 'Cairns', lat: -16.9186, lon: 145.7781 },
        { name: 'GoldCoast', lat: -28.0167, lon: 153.4000 },
        { name: 'Townsville', lat: -19.2589, lon: 146.8179 },
        { name: 'Adelaide', lat: -34.9285, lon: 138.6007 },
        { name: 'MountGambier', lat: -37.8318, lon: 140.7857 },
        { name: 'Nuriootpa', lat: -34.4680, lon: 138.9965 },
        { name: 'Woomera', lat: -31.1984, lon: 136.8255 },
        { name: 'Albany', lat: -35.0255, lon: 117.8847 },
        { name: 'Witchcliffe', lat: -34.0304, lon: 115.0927 },
        { name: 'PearceRAAF', lat: -31.6676, lon: 116.0165 },
        { name: 'PerthAirport', lat: -31.9403, lon: 115.9670 },
        { name: 'Perth', lat: -31.9505, lon: 115.8605 },
        { name: 'SalmonGums', lat: -32.9878, lon: 121.6405 },
        { name: 'Walpole', lat: -34.9781, lon: 116.7333 },
        { name: 'Hobart', lat: -42.8821, lon: 147.3272 },
        { name: 'Launceston', lat: -41.4388, lon: 147.1347 },
        { name: 'AliceSprings', lat: -23.6980, lon: 133.8807 },
        { name: 'Darwin', lat: -12.4634, lon: 130.8456 },
        { name: 'Katherine', lat: -14.4646, lon: 132.2635 },
        { name: 'Uluru', lat: -25.3444, lon: 131.0369 }
      ];

    cities.forEach(city => {
      const marker = L.marker([city.lat, city.lon]).addTo(map);
      marker.bindPopup(city.name);

      marker.on('click', () => {
        setSelectedCity(city.name);
      });
    });

    return () => {
      map.remove();
    };
  }, []);

  useEffect(() => {
    if (selectedCity) {
      onLocationSelect(`${selectedCity}`);
    }
  }, [selectedCity, onLocationSelect]);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-slate-100 dark:bg-gray-700 rounded-lg shadow-lg rounded-xl justify-center items-center mb-6 pt-6 pb-6">
      <div id="map" className="mb-4 z-0" style={{ height: '600px', width: '80%' }}></div>
      {selectedCity ? (
          <p>
            <span className="font-semibold">{selectedCity}</span>
          </p>
        ) : (
          <p className="text-gray-500">No selection made</p>
        )}

    </div>
  );
};

export default AustraliaMap;
