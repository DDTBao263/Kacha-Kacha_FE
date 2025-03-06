import { useState } from "react";
import { Restaurant } from "../../types/restaurant";
import { BiEditAlt } from "react-icons/bi";

const restaurantData: Restaurant[] = [
    {
      restaurantID: "1",
      name: "Kacha-Kacha 1",
      location: "4 Le Van Viet - Thu Duc",
      status: "activate",
    },
    {
      restaurantID: "2",
      name: "Kacha-Kacha 2",
      location: "12 Nguyen Hue - Quan 1",
      status: "activate",
    },
    {
      restaurantID: "3",
      name: "Kacha-Kacha 3",
      location: "22 Tran Phu - Quan 5",
      status: "closed",
    },
    {
      restaurantID: "4",
      name: "Kacha-Kacha 4",
      location: "99 Hoang Dieu - Quan 4",
      status: "activate",
    },
];

type TableStoreProps = {
  onEdit: (data: Restaurant) => void;
};

const TableStore: React.FC<TableStoreProps> = ({ onEdit }) => {
  return (
    <div className="rounded-md border border-gray-300 bg-white p-6 shadow-lg">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse table-fixed">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="py-3 px-4 w-1/12 text-left">ID</th>
              <th className="py-3 px-4 w-2/12">Name</th>
              <th className="py-3 px-4 w-3/12">Location</th>
              <th className="py-3 px-4 w-1/12">Status</th>
              <th className="py-3 px-4 w-1/12">Action</th>
            </tr>
          </thead>
          <tbody>
            {restaurantData.map((item) => (
              <tr key={item.restaurantID} className="border-b hover:bg-gray-100">
                <td className="py-4 px-4 text-left">{item.restaurantID}</td>
                <td className="py-4 px-4">{item.name}</td>
                <td className="py-4 px-4">{item.location}</td>
                <td className="py-4 px-4">
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full ${
                      item.status === "activate"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="py-4 px-4 flex space-x-2">
                  <button
                    onClick={() => onEdit(item)}
                    className="px-3 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                  >
                    <BiEditAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableStore;
