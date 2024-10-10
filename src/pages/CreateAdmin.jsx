import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { All_ADMIN } from '../routes/Routes';

const CreateAdmin = () => {
  const navigate = useNavigate();

  // State to manage form values
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    phoneNumber: '',
    joiningDate: '',
    endDate: '',
    status: 'Working', // Default value
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to generate a unique ID using date, time, and name
  const generateUniqueId = () => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}${(now.getMonth() + 1)
      .toString()
      .padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}`;
    const formattedTime = `${now.getHours().toString().padStart(2, '0')}${now
      .getMinutes()
      .toString()
      .padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}`;

    const employeeName = formData.name.replace(/\s+/g, '').toUpperCase();
    return `${employeeName}-${formattedDate}-${formattedTime}`;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure required fields are filled
    const requiredFields = ['name', 'username', 'password', 'phoneNumber', 'joiningDate'];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      toast.error(`Please fill in the following fields: ${missingFields.join(', ')}`);
      return;
    }

    // Generate unique ID for the executive
    const executiveId = generateUniqueId();

    // Prepare data with generated ID
    const dataToSend = {
      id: executiveId,
      ...formData,
    };

    try {
      const response = await axios.post('http://localhost:3000/register-admin', dataToSend);
      toast.success('admin created successfully!');
      navigate(All_ADMIN); // Change this to your desired redirect route
    } catch (error) {
      toast.error('Error creating executive!');
      console.error('Error:', error);
    }
  };

  return (
    <div className="bg-[#f6f7f9] w-full h-full flex flex-col justify-center items-center">
      <Toaster position="top-right" reverseOrder={true} />
      <h2 className="my-8 font-bold text-3xl">Create Admin</h2>
      <div className="my-8 bg-white p-4 w-9/12 h-fit rounded-md shadow-sm">
        
        {/* Name */}
        <div className="flex flex-col border-b">
          <label className="font-semibold">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="text"
            placeholder="Enter Name"
          />
        </div>

        {/* User ID */}
        <div className="flex flex-col border-b">
          <label className="font-semibold">Login ID</label>
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="text"
            placeholder="Enter Login ID"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col border-b">
          <label className="font-semibold">Password</label>
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="password"
            placeholder="Enter Password"
          />
        </div>

        {/* Phone Number */}
        <div className="flex flex-col border-b">
          <label className="font-semibold">Phone Number</label>
          <input
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="tel"
            placeholder="Enter Phone Number"
            pattern="[0-9]{10}"
            maxLength={10}
          />
        </div>

        {/* Joining Date */}
        <div className="flex flex-col border-b">
          <label className="font-semibold">Joining Date</label>
          <input
            name="joiningDate"
            value={formData.joiningDate}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="date"
          />
        </div>

        {/* End Date */}
        <div className="flex flex-col border-b">
          <label className="font-semibold">End Date</label>
          <input
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="date"
          />
        </div>

        {/* Status */}
        <div className="flex flex-col border-b">
          <label className="font-semibold">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
          >
            <option value="Working">Working</option>
            <option value="Resigned">Resigned</option>
            <option value="Terminated">Terminated</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          className="bg-blue-500 text-white p-2 rounded mt-4"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CreateAdmin;
