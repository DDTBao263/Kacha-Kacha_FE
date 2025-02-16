import React, { useState } from "react";
import { USER } from "../../types/user.ts";

const usersData: USER[] = [
  {
    ids: 1,
    image:
      "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
    name: "Jonh Doe",
    restaurantName: "Thành Công",
    role: "Restaurant Manager",
    status: "new",
  },
  {
    ids: 2,
    image:
      "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
    name: "William",
    restaurantName: "Vịt 34",
    role: "Store Manager",
    status: "left",
  },
  {
    ids: 3,
    image:
      "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
    name: "Benjamin",
    restaurantName: "Vịt 36",
    role: "Employee",
    status: "new",
  },
  {
    ids: 4,
    image:
      "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
    name: "Carter",
    restaurantName: "Vịt 37",
    role: "Employee",
    status: "left",
  },
  {
    ids: 5,
    image:
      "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
    name: "Daniel",
    restaurantName: "Vịt 39",
    role: "Employee",
    status: "new",
  },
];

const TableOne = () => {
  const [filter, setFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 3;

  // Lọc danh sách theo trạng thái
  const filteredUsers = usersData.filter((user) => {
    if (filter === "all") return true;
    return user.status === filter;
  });

  // Xử lý phân trang
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const displayedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="rounded-sm border border-stroke bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
      List of employees
      </h4>

      {/* Bộ lọc */}
      <div className="mb-4 flex gap-4">
        {[
          { label: "All", value: "all", color: "blue" },
          { label: "New employee", value: "new", color: "blue" },
          { label: "Staff leave", value: "left", color: "blue" },
        ].map((btn) => (
          <button
            key={btn.value}
            className={`px-4 py-2 border rounded transition-all duration-300 ${
              filter === btn.value
                ? `bg-${btn.color}-500 text-white shadow-md font-bold`
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setFilter(btn.value)}
          >
            {btn.label}
          </button>
        ))}
      </div>


      {/* Bảng danh sách nhân viên */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">#ID</th>
            <th className="border border-gray-300 p-2">Image User</th>
            <th className="border border-gray-300 p-2">Name User</th>
            <th className="border border-gray-300 p-2">Restaurant name</th>
            <th className="border border-gray-300 p-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {displayedUsers.map((user) => (
            <tr key={user.ids} className="text-center">
              <td className="border border-gray-300 p-2">{user.ids}</td>
              <td className="border border-gray-300 p-2">
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-10 h-10 rounded-full mx-auto"
                />
              </td>
              <td className="border border-gray-300 p-2">{user.name}</td>
              <td className="border border-gray-300 p-2">{user.restaurantName}</td>
              <td className="border border-gray-300 p-2">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Phân trang */}
      <div className="flex justify-center mt-4">
        <button
          className={`px-4 py-2 border rounded ${
            currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"
          }`}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </button>
        <span className="mx-4 text-lg">
          {currentPage} / {totalPages}
        </span>
        <button
          className={`px-4 py-2 border rounded ${
            currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"
          }`}
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TableOne;
