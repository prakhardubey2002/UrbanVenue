import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

const CreateOccasion = () => {
  const navigate = useNavigate();

  // State to manage form values
  const [formData, setFormData] = useState({
    id: '',
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = ['id', 'name'];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      toast.error(`Please fill in the following fields: ${missingFields.join(', ')}`);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/occasion/occasions', formData);
      toast.success('Occasion created successfully!');
    //   navigate('/occasions'); // Redirect to the occasions list page
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
        {/* ID */}
        <div className="flex flex-col border-b">
          <label className="font-semibold">ID</label>
          <input
            name="id"
            value={formData.id}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="text"
            placeholder="Enter Occasion ID"
          />
        </div>

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
