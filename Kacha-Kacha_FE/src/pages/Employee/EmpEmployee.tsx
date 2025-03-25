import { employeeService } from '../../services/employee';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { Button } from '../../components/ui/button';
import { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';
// import { EMPLOYEE } from '../../types/employee';
import { storeService } from '../../services/store';
import { Store } from '../../types/store';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../components/ui/pagination';
// import { ACCOUNT } from '../../types/account';
import { EditEmployeeDiaLog } from './EditEmployee';

interface EMPLOYEE {
  employeeId: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
  status: string;
  restaurantId: string;
  restaurantLocation: string;
}

const Employee = () => {
  const [employees, setEmployees] = useState<EMPLOYEE[]>([]);
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<EMPLOYEE | null>(
    null,
  );
  const [restaurant, setRestaurant] = useState<Store[] | []>([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchAllRestaurant();
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (restaurant.length > 0) {
      fetchEmployees(currentPage, 10, searchQuery);
    }
  }, [restaurant, currentPage, searchQuery]);

  const fetchAllRestaurant = async () => {
    const page: number = 1;
    const size: number = 100;
    const keyword: string = '';
    try {
      const response = await storeService.getAllStores(page - 1, size, keyword);
      if (response.data) {
        setRestaurant(response.data.content);
      }
    } catch (error) {
      console.error('Failed to fetch restaurant:', error);
    }
  };

  const fetchEmployees = async (
    page: number,
    size: number,
    keyword: string,
  ) => {
    try {
      const response = await employeeService.getEmployee(
        page - 1,
        size,
        keyword,
      );
      // console.log("Danh sách nhân viên:", response.data.data.content);
      // console.log("Danh sách nhà hàng:", restaurant);

      const employees: EMPLOYEE[] =
        response.data.data.content?.map((employee: any) => {
          const restaurantData: Store | undefined = restaurant.find(
            (r: Store) => r.id == employee.restaurantId,
          );
          // console.log(`Employee ${employee.name} có restaurantId:`, employee.restaurantId);
          // console.log(`Tìm thấy restaurantData:`, restaurantData);

          return {
            ...employee,
            restaurantLocation: restaurantData
              ? restaurantData.location
              : 'Not determined',
          };
        }) || [];

      setEmployees(employees);
      setTotalPages(response.data.data.totalPages || 1);
    } catch (error) {
      console.error('Failed to fetch employee:', error);
    }
  };

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const debouncedSearch = useCallback(
    debounce((keyword) => {
      setSearchQuery(keyword);
    }, 50),
    [],
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const handleEditClick = (emp: EMPLOYEE) => {
    // console.log('Selected account ID:', account.userId);
    // console.log('Selected account:', account);
    setSelectedEmployee(emp);
    setEditDialogOpen(true);
  };

  return (
    <>
      <Breadcrumb pageName="Employee" />
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by name or email..."
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              onChange={handleSearchChange}
            />
          </div>
          {/* <Button
            // onClick={() => setIsAddDialogOpen(true)}
            className="ml-auto py-6 px-10"
          >
            Add Employee Account
          </Button> */}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b bg-gray-2 dark:bg-meta-4">
                <th className="text-left py-4 px-4 font-medium text-slate-600">
                  NAME
                </th>
                <th className="text-left py-4 px-4 font-medium text-slate-600">
                  EMAIL
                </th>
                <th className="text-left py-4 px-4 font-medium text-slate-600">
                  PHONE
                </th>
                <th className="text-left py-4 px-4 font-medium text-slate-600">
                  ADDRESS
                </th>
                <th className="text-left py-4 px-4 font-medium text-slate-600">
                  STATUS
                </th>
                <th className="text-center py-4 px-4 font-medium text-slate-600">
                  VIEW
                </th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, key) => (
                <tr className="border-b hover:bg-slate-50" key={key}>
                  <td className="py-4 px-4 text-slate-800">{emp.name}</td>
                  <td className="py-4 px-4 text-slate-800">{emp.email}</td>
                  <td className="py-4 px-4 text-slate-800">
                    {emp.phoneNumber}
                  </td>
                  <td className="py-4 px-4 text-slate-800">{emp.address}</td>
                  <td className="py-4 px-4">
                    <p
                      className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                        emp.status === 'ACTIVE'
                          ? 'bg-success text-success'
                          : emp.status === 'INACTIVE'
                          ? 'bg-danger text-danger'
                          : 'bg-warning text-warning'
                      }`}
                    >
                      {emp.status}
                    </p>
                  </td>
                  <td className="py-4 px-4 flex justify-center">
                    <button
                      onClick={() => handleEditClick(emp)}
                      className="hover:text-primary"
                    >
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                          fill=""
                        />
                        <path
                          d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                          fill=""
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination className="mt-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => handlePageChange(currentPage - 1)}
                isDisabled={currentPage === 1}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  isActive={index + 1 === currentPage}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => handlePageChange(currentPage + 1)}
                isDisabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <EditEmployeeDiaLog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        account={selectedEmployee}
        restaurant={restaurant}
        //onSave={handleUpdateAccount}
      />
    </>
  );
};

export default Employee;
