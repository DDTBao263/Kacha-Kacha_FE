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
    <>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b bg-gray-2 dark:bg-meta-4">
                <th className="text-left py-4 px-4 font-medium text-slate-600">ID</th>
                <th className="text-left py-4 px-4 font-medium text-slate-600">Name</th>
                <th className="text-left py-4 px-4 font-medium text-slate-600">Location</th>
                <th className="text-left py-4 px-4 font-medium text-slate-600">Status</th>
                <th className="text-left py-4 px-4 font-medium text-slate-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {restaurantData.map((item) => (
                <tr key={item.restaurantID} className="border-b hover:bg-slate-50">
                  <td className="py-4 px-4 text-slate-800">{item.restaurantID}</td>
                  <td className="py-4 px-4 text-slate-800">{item.name}</td>
                  <td className="py-4 px-4 text-slate-800">{item.location}</td>
                  <td className="py-4 px-4">
                    <p
                      className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                        item.status === "activate"
                          ? "bg-success text-success"
                          : "bg-danger text-danger"
                      }`}
                    >
                      {item.status}
                    </p>
                  </td>
                  <td className="py-4 px-4 flex justify-start">
                    <button onClick={() => onEdit(item)} className="hover:text-primary">
                      <BiEditAlt size={24} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TableStore;