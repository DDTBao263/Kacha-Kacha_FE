import React from 'react';

type FormStoreProps = {
  popupMode: 'add' | 'update';
  formData: {
    restaurantID: string;
    name: string;
    location: string;
    status: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  closePopup: () => void;
};

const FormStore: React.FC<FormStoreProps> = ({ popupMode, formData, handleChange, handleSubmit, closePopup }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          {popupMode === 'add' ? 'Add New Restaurant' : 'Update Restaurant'}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Restaurant Name"
            className="border p-2 rounded"
            onChange={handleChange}
          />
          <input
            type="text"
            name="location"
            value={formData.location}
            placeholder="Location"
            className="border p-2 rounded"
            onChange={handleChange}
          />
          <div className="relative">
            <select
              name="status"
              value={formData.status}
              className={`border p-2 rounded w-full appearance-none ${
                formData.status === "activate"
                  ? "bg-green-200 text-green-800"
                  : formData.status === "closed"
                  ? "bg-red-200 text-red-800"
                  : "bg-white text-black"
              }`}
              onChange={handleChange}
            >
              <option value="" className="bg-white text-black">Select Status</option>
              <option value="activate" className="bg-white text-black">Activate</option>
              <option value="closed" className="bg-white text-black">Closed</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={closePopup}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              {popupMode === 'add' ? 'Add' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormStore;
