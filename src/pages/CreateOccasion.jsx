import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { ALL_OCCASION } from '../routes/Routes';

const CreateOccasion = () => {
  const navigate = useNavigate();

  // State to manage form values
  const [formData, setFormData] = useState({
    name: '',
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to generate a unique ID
  const generateUniqueId = () => {
    const now = new Date();
    return `OCC-${now.getFullYear()}${(now.getMonth() + 1)
      .toString()
      .padStart(2, '0')}${now
        .getDate()
        .toString()
        .padStart(2, '0')}${now
          .getHours()
          .toString()
          .padStart(2, '0')}${now
            .getMinutes()
            .toString()
            .padStart(2, '0')}${now
              .getSeconds()
              .toString()
              .padStart(2, '0')}`;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Generate unique ID for the occasion
    const occasionId = generateUniqueId();

    // Ensure name is provided
    if (!formData.name) {
      toast.error('Please enter the occasion name');
      return;
    }

    // Prepare data with generated ID
    const dataToSend = {
      id: occasionId,
      name: formData.name,
    };

    try {
      const response = await axios.post('https://backend.urbanvenue.in/occasion/occasions', dataToSend);
      toast.success('Occasion created successfully!');
      navigate(ALL_OCCASION); // Redirect to the occasions list page
    } catch (error) {
      toast.error('Error creating occasion!');
      console.error('Error:', error);
    }
  };

  return (
    <div className="bg-[#f6f7f9] w-full h-full flex flex-col justify-center items-center">
      <Toaster position="top-right" reverseOrder={true} />
      <h2 className="my-8 font-bold text-3xl">Create Occasion</h2>
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
            placeholder="Enter Occasion Name"
          />
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

export default CreateOccasion;
