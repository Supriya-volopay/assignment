import React, { useState } from "react";
import Loading from "./Loading";

const Modal = ({ isOpen, onClose, onSave, topic, field, fieldData }) => {
  const [formData, setFormData] = useState(fieldData);
  const [isloading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setLoading(true);
    onSave(formData);
    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(10,10,10,0.07)] bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-2/5 p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4">{topic}</h2>
        <div className="space-y-4">
          {field?.map((item, index) => (
            <div key={index} className="flex items-center justify-center">
              <label htmlFor={item} className="m-1 w-1/4">
                {item.name + ":"}
              </label>
              <input
                type="text"
                name={item.slug}
                placeholder={`Enter ${item.name}`}
                value={formData[item.slug]}
                onChange={handleInputChange}
                className="w-3/4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            {isloading ? <Loading extraClasses="h-5" /> : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
