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
        <h2 className="text-2xl font-semibold mb-4">
          {popupMode === 'add' ? 'Add New Restaurant' : 'Update Restaurant'}
        </h2>
        <p className="text-gray-600 mb-4">
          {popupMode === 'add' ? 'Fill in the details to add a new restaurant.' : 'Update the restaurant details below.'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Restaurant Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="font-medium text-gray-700">Restaurant Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              placeholder="Enter restaurant name"
              className="border p-2 rounded w-full"
              onChange={handleChange}
              required
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label htmlFor="location" className="font-medium text-gray-700">Location</label>
            <input
              id="location"
              type="text"
              name="location"
              value={formData.location}
              placeholder="Enter location"
              className="border p-2 rounded w-full"
              onChange={handleChange}
              required
            />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label htmlFor="status" className="font-medium text-gray-700">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              className={`border p-2 rounded w-full appearance-none transition-colors ${formData.status === 'activate'
                  ? 'bg-green-200 text-green-800'
                  : formData.status === 'closed'
                    ? 'bg-red-200 text-red-800'
                    : 'bg-white text-black'
                }`}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select status</option>
              <option value="activate">Activate</option>
              <option value="closed">Closed</option>
            </select>
          </div>


          {/* Buttons */}
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
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
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
