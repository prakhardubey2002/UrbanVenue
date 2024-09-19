import React, { useEffect, useState } from 'react';
import NavTopBar from '../components/NavTopBar';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axios from 'axios';
import RefreshIcon from '@mui/icons-material/Refresh';
import CustomNavTopbar from '../components/CustomNavTopbar';
import { CREATE_FARMS } from '../routes/Routes';

const AllFarms = () => {
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [states, setStates] = useState([]);
  const [places, setPlaces] = useState([]);
  const [farmNames, setFarmNames] = useState([]);
  const [addresses, setAddresses] = useState([]);

  const [selectedState, setSelectedState] = useState('');
  const [selectedPlace, setSelectedPlace] = useState('');
  const [selectedFarmName, setSelectedFarmName] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');

  const [filteredFarms, setFilteredFarms] = useState([]);

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/calender/all-farms');
        const farmData = response.data;

        setFarms(farmData);
        setFilteredFarms(farmData); // Initially show all farms

        // Extract unique values for filter options
        setStates([...new Set(farmData.map((farm) => farm.state))]);
        setPlaces([...new Set(farmData.map((farm) => farm.place))]);
        setFarmNames([...new Set(farmData.map((farm) => farm.farmName))]);
        setAddresses([...new Set(farmData.map((farm) => farm.address.addressLine1))]); // Assuming addressLine1 for filtering

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchFarms();
  }, []);

  const handleFind = () => {
    const filtered = farms.filter((farm) => {
      return (
        (selectedState ? farm.state === selectedState : true) &&
        (selectedPlace ? farm.place === selectedPlace : true) &&
        (selectedFarmName ? farm.farmName === selectedFarmName : true) &&
        (selectedAddress ? farm.address.addressLine1.includes(selectedAddress) : true) // Adjust as needed
      );
    });
    setFilteredFarms(filtered);
  };

  const resetFilters = () => {
    setSelectedState('');
    setSelectedPlace('');
    setSelectedFarmName('');
    setSelectedAddress('');
    setFilteredFarms(farms); // Reset to show all farms
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full h-screen flex flex-col">
      {/* <NavTopBar /> */}
      <CustomNavTopbar text={"Create Property"} route={CREATE_FARMS} />
      <div className="flex-1 flex justify-center items-center">
        <div className="px-4 w-[90%] min-h-[60%]">
          <h2 className="text-2xl font-semibold my-4">Filter Farms</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* State Filter */}
            <div className="relative flex items-center bg-white py-2 px-4 border border-gray-300 rounded-md">
              <LocationOnIcon className="text-gray-400 mr-2" />
              <select
                className="outline-none border-none w-full"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
              >
                <option value="">Select State</option>
                {states.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            {/* Place Filter */}
            <div className="relative flex items-center bg-white py-2 px-4 border border-gray-300 rounded-md">
              <SearchIcon className="text-gray-400 mr-2" />
              <select
                className="outline-none border-none w-full"
                value={selectedPlace}
                onChange={(e) => setSelectedPlace(e.target.value)}
              >
                <option value="">Select Place</option>
                {places.map((place, index) => (
                  <option key={index} value={place}>
                    {place}
                  </option>
                ))}
              </select>
            </div>

            {/* Farm Name Filter */}
            <div className="relative flex items-center bg-white py-2 px-4 border border-gray-300 rounded-md">
              <SearchIcon className="text-gray-400 mr-2" />
              <select
                className="outline-none border-none w-full"
                value={selectedFarmName}
                onChange={(e) => setSelectedFarmName(e.target.value)}
              >
                <option value="">Select Farm</option>
                {farmNames.map((farmName, index) => (
                  <option key={index} value={farmName}>
                    {farmName}
                  </option>
                ))}
              </select>
            </div>

            {/* Address Filter */}
            <div className="relative flex items-center bg-white py-2 px-4 border border-gray-300 rounded-md">
              <SearchIcon className="text-gray-400 mr-2" />
              <input
                type="text"
                value={selectedAddress}
                onChange={(e) => setSelectedAddress(e.target.value)}
                className="outline-none border-none w-full"
                placeholder="Enter Address"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={handleFind}
              className="w-fit bg-Primary text-white h-[40px] flex items-center justify-center rounded-tl-[3px] border-t border-transparent px-4 py-[10px]"
            >
              Find
            </button>
            <button
              onClick={resetFilters}
              className="flex items-center justify-center py-[8px] px-[14px] border border-Bordgrey rounded-md"
            >
              <RefreshIcon className="text-black mr-2" />
              Reset
            </button>
          </div>

          {/* Farms Table */}
          <div className="overflow-auto">
  <table className="min-w-full bg-white border border-gray-300">
    <thead>
      <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
        <th className="py-3 px-6 text-left border border-gray-300">State</th>
        <th className="py-3 px-6 text-left border border-gray-300">Place</th>
        <th className="py-3 px-6 text-left border border-gray-300">Farm Name</th>
        <th className="py-3 px-6 text-left border border-gray-300">Address Line 1</th>
        <th className="py-3 px-6 text-left border border-gray-300">Address Line 2</th>
        <th className="py-3 px-6 text-left border border-gray-300">Suburb</th>
        <th className="py-3 px-6 text-left border border-gray-300">Zip Code</th>
        <th className="py-3 px-6 text-left border border-gray-300">Country</th>
      </tr>
    </thead>
    <tbody className="text-gray-600 text-sm font-light">
      {filteredFarms.map((farm, index) => {
        // Access state, place, and farm details
        const state = farm.state; // Adjust as per actual state data in filteredFarms
        const place = farm.place; // Adjust as per actual place data in filteredFarms
        const details = farm.details || {};
        const address = farm.address || {};
        console.log(farm)
        return (
          <tr key={index}>
            <td className="py-3 px-6 border border-gray-300">{state}</td>
            <td className="py-3 px-6 border border-gray-300">{place}</td>
            <td className="py-3 px-6 border border-gray-300">{details.name}</td>
            <td className="py-3 px-6 border border-gray-300">{address.addressLine1}</td>
            <td className="py-3 px-6 border border-gray-300">{address.addressLine2}</td>
            <td className="py-3 px-6 border border-gray-300">{address.suburb}</td>
            <td className="py-3 px-6 border border-gray-300">{address.zipCode}</td>
            <td className="py-3 px-6 border border-gray-300">{address.country}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>

        </div>
      </div>
    </div>
  );
};

export default AllFarms;
