import React from 'react';

const Dialog = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-[80vw] max-w-4xl p-6">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(data).map(([label, value], index) => (
            <div key={index} className="flex flex-col">
              <label className="font-semibold text-gray-700">{label}</label>
              <span className="text-gray-500">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dialog;
