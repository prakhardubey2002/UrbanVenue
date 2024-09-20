import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RefreshIcon from '@mui/icons-material/Refresh';
import CustomNavTopbar from '../components/CustomNavTopbar';
import { CREATE_FARMS } from '../routes/Routes';

const AllFarms = () => {
  const [farms, setFarms] = useState([]);
  const [filteredFarms, setFilteredFarms] = useState([]);
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
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [formData, setFormData] = useState({});

  const convertTo24Hour = (time12h) => {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    if (modifier === 'PM' && hours !== '12') hours = parseInt(hours, 10) + 12;
    if (modifier === 'AM' && hours === '12') hours = 0;
    return `${hours.toString().padStart(2, '0')}:${minutes}`;
  };

  const convertTo12Hour = (time24h) => {
    let [hours, minutes] = time24h.split(':');
    const modifier = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${modifier}`;
  };

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/calender/all-farms');
        const farmData = response.data;
        setFarms(farmData);
        setFilteredFarms(farmData);

        setStates([...new Set(farmData.map((farm) => farm.state))]);
        setPlaces([...new Set(farmData.map((farm) => farm.place))]);
        setFarmNames([...new Set(farmData.map((farm) => farm.details?.name))]);
        setAddresses([...new Set(farmData.map((farm) => farm.address?.addressLine1))]);

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
        (selectedFarmName ? farm.details?.name === selectedFarmName : true) &&
        (selectedAddress ? farm.address?.addressLine1.includes(selectedAddress) : true)
      );
    });
    setFilteredFarms(filtered);
  };

  const resetFilters = () => {
    setSelectedState('');
    setSelectedPlace('');
    setSelectedFarmName('');
    setSelectedAddress('');
    setFilteredFarms(farms);
  };

  const handleEditClick = (farm) => {
    setSelectedFarm(farm);
    setFormData({
      ...farm,
      checkInTime: farm.checkInTime ? convertTo24Hour(farm.checkInTime) : '',
      checkOutTime: farm.checkOutTime ? convertTo24Hour(farm.checkOutTime) : '',
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedFarm(null);
    setFormData({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('Time')) {
      // Convert to 24-hour format before setting form data
      setFormData({ ...formData, [name]: value ? convertTo24Hour(value) : '' });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    if (!selectedFarm) return;
    console.log(formData)
    try {
      await axios.put(`http://localhost:3000/api/calender/update-farm/${selectedFarm.farmId}`, formData);
      const response = await axios.get('http://localhost:3000/api/calender/all-farms');
      setFarms(response.data);
      handleFind();
      handleCloseDialog();
    } catch (error) {
      console.error('Error updating farm:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full h-screen flex flex-col">
      <CustomNavTopbar text={'Create Property'} route={CREATE_FARMS} />
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
              className="flex items-center justify-center text-gray-600 h-[40px] border border-gray-300 rounded-tl-[3px] px-4 py-[10px]"
            >
              <RefreshIcon className="text-black mr-2" />
              Reset
            </button>
          </div>

          {/* Farms Table */}
          <div className="overflow-auto">
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>State</TableCell>
                    <TableCell>Place</TableCell>
                    <TableCell>Farm Name</TableCell>
                    <TableCell>Farm ID</TableCell>
                    <TableCell>Address Line 1</TableCell>
                    <TableCell>Address Line 2</TableCell>
                    <TableCell>Suburb</TableCell>
                    <TableCell>Zip Code</TableCell>
                    <TableCell>Country</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredFarms.map((farm, index) => {
                    const address = farm.address || {};
                    return (
                      <TableRow key={index}>
                        <TableCell>{farm.state}</TableCell>
                        <TableCell>{farm.place}</TableCell>
                        <TableCell>{farm.name || 'N/A'}</TableCell>
                        <TableCell>{farm.farmId || 'N/A'}</TableCell>
                        <TableCell>{address.addressLine1 || 'N/A'}</TableCell>
                        <TableCell>{address.addressLine2 || 'N/A'}</TableCell>
                        <TableCell>{address.suburb || 'N/A'}</TableCell>
                        <TableCell>{address.zipCode || 'N/A'}</TableCell>
                        <TableCell>{address.country || 'N/A'}</TableCell>
                        <TableCell>
                          <Button
                            onClick={() => handleEditClick(farm)}
                            variant="contained"
                            color="primary"
                          >
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>Edit Farm Details</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="name"
            label="Farm Name"
            fullWidth
            value={formData.name || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="phoneNumber"
            label="Phone Number"
            fullWidth
            value={formData.phoneNumber || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="checkInDate"
            label="Check-In Date"
            type="date"
            fullWidth
            value={formData.checkInDate?.slice(0, 10) || ''}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            name="checkInTime"
            label="Check-In Time"
            type="time"
            fullWidth
            value={formData.checkInTime || ''}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            name="checkOutDate"
            label="Check-Out Date"
            type="date"
            fullWidth
            value={formData.checkOutDate?.slice(0, 10) || ''}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            name="checkOutTime"
            label="Check-Out Time"
            type="time"
            fullWidth
            value={formData.checkOutTime || ''}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            name="maxPeople"
            label="Max People"
            type="number"
            fullWidth
            value={formData.maxPeople || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="occasion"
            label="Occasion"
            fullWidth
            value={formData.occasion || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="hostOwnerName"
            label="Host Owner Name"
            fullWidth
            value={formData.hostOwnerName || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="hostNumber"
            label="Host Number"
            fullWidth
            value={formData.hostNumber || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="totalBooking"
            label="Total Booking"
            type="number"
            fullWidth
            value={formData.totalBooking || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="advance"
            label="Advance"
            type="number"
            fullWidth
            value={formData.advance || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="balancePayment"
            label="Balance Payment"
            type="number"
            fullWidth
            value={formData.balancePayment || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="securityAmount"
            label="Security Amount"
            type="number"
            fullWidth
            value={formData.securityAmount || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="address.addressLine1"
            label="Address Line 1"
            fullWidth
            value={formData.address?.addressLine1 || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="address.addressLine2"
            label="Address Line 2"
            fullWidth
            value={formData.address?.addressLine2 || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="address.suburb"
            label="Suburb"
            fullWidth
            value={formData.address?.suburb || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="address.zipCode"
            label="Zip Code"
            fullWidth
            value={formData.address?.zipCode || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="address.country"
            label="Country"
            fullWidth
            value={formData.address?.country || ''}
            onChange={handleChange}
          />
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={formData.status || ''}
              onChange={handleChange}
            >
              <MenuItem value="confirmed">Confirmed</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AllFarms;
