import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { ACCOUNT } from '../../types/account';
import { useEffect, useState } from 'react';
import { AddAccountDialog } from './NewAccount';
import { Button } from '../../components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../components/ui/pagination';
import { EditAccountDialog } from './EditAccount';
import { userService } from '../../services/user';

const Account = () => {
  // const accountData: ACCOUNT[] = [
  //   {
  //     id: '1',
  //     name: 'Doan Dang Thien Bao',
  //     email: 'baoddtse171827@fpt.edu.vn',
  //     role: 'Admin',
  //     restaurantName: '-',
  //     status: 'Active',
  //     joinDate: 'Jan 13,2023',
  //   },
  //   {
  //     id: '2',
  //     name: 'Nguyen Chi Thanh',
  //     email: 'baoddtse171827@fpt.edu.vn',
  //     role: 'Restaurant Manager',
  //     restaurantName: '-',
  //     status: 'Active',
  //     joinDate: 'Jan 13,2023',
  //   },
  //   {
  //     id: '3',
  //     name: 'Nguyen Trong Thien',
  //     email: 'baoddtse171827@fpt.edu.vn',
  //     role: 'Store Manager',
  //     restaurantName: 'CN1',
  //     status: 'Active',
  //     joinDate: 'Jan 13,2023',
  //   },
  //   {
  //     id: '4',
  //     name: 'Huynh Minh Khoi',
  //     email: 'baoddtse171827@fpt.edu.vn',
  //     role: 'Admin',
  //     restaurantName: 'CN1',
  //     status: 'Inactive',
  //     joinDate: 'Jan 13,2023',
  //   },
  //   {
  //     id: '5',
  //     name: 'Do Mau Thanh',
  //     email: 'baoddtse171827@fpt.edu.vn',
  //     role: 'Employee',
  //     restaurantName: 'CN2',
  //     status: 'Inactive',
  //     joinDate: 'Jan 13,2023',
  //   },
  // ];
  const [accounts, setAccounts] = useState<ACCOUNT[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<ACCOUNT | null>(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await userService.getAllUsers();
        const users = response.data.data.map((user: any) => ({
          id: user.userID,
          name: `${user.lastName} ${user.firstName}`,
          email: user.email,
          role: user.role,
          restaurantName: '-', // Assuming restaurantName is not available in the API response
          status: 'Active', // Assuming status is not available in the API response
          joinDate: 'Jan 13,2023', // Assuming joinDate is not available in the API response
        }));
        setAccounts(users);
      } catch (error) {
        console.error('Failed to fetch accounts:', error);
      }
    };

    fetchAccounts();
  }, []);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  const handleAddAccount = (newAccount: Omit<ACCOUNT, 'id' | 'joinDate'>) => {
    const today = new Date();
    const formattedDate = `Jan ${today.getDate()},${today.getFullYear()}`;

    const account: ACCOUNT = {
      ...newAccount,
      id: (accounts.length + 1).toString(),
      joinDate: formattedDate,
    };

    setAccounts([...accounts, account]);
    setIsAddDialogOpen(false);
  };

  const handleEditClick = (account: ACCOUNT) => {
    setSelectedAccount(account);
    setEditDialogOpen(true);
  };
  return (
    <>
      <Breadcrumb pageName="Account" />

      {/* <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Account List
        </h4>

        <div className="flex flex-col">
          <div className="grid grid-cols-3 sm:grid-cols-7 rounded-sm bg-gray-2 dark:bg-meta-4">
            <div className="p-2.5 xl:p-5 text-start">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Name
              </h5>
            </div>
            <div className="p-2.5 xl:p-5 text-start">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Email
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Position
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Restaurant
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Status
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Join Date
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Action
              </h5>
            </div>
          </div>

          {accountData.map((account, key) => (
            <div
              className={`grid grid-cols-3 sm:grid-cols-7 ${
                key === accountData.length - 1
                  ? ''
                  : 'border-b border-stroke dark:border-strokedark'
              }`}
              key={key}
            >
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <p className="hidden text-black dark:text-white sm:block">
                  {account.name}
                </p>
              </div>
              <div className="flex items-center justify-start gap-3 p-2.5 xl:p-5">
                <p className="hidden text-black dark:text-white sm:block">
                  {account.email}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{account.role}</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">{account.restaurantName}</p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p
                  className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                    account.status === 'Active'
                      ? 'bg-success text-success'
                      : account.status === 'Inactive'
                      ? 'bg-danger text-danger'
                      : 'bg-warning text-warning'
                  }`}
                >
                  {account.status}
                </p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-black dark:text-white">{account.joinDate}</p>
              </div>
              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <button className="hover:text-primary">
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
              </div>
            </div>
          ))}
        </div>
      </div> */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by name, email..."
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="relative z-20 bg-transparent dark:bg-form-input">
              <select
                value={selectedOption}
                onChange={(e) => {
                  setSelectedOption(e.target.value);
                  changeTextColor();
                }}
                className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 pl-5 pr-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                  isOptionSelected ? 'text-black dark:text-white' : ''
                }`}
              >
                <option
                  value=""
                  disabled
                  className="text-body dark:text-bodydark"
                >
                  Select your subject
                </option>
                <option value="USA" className="text-body dark:text-bodydark">
                  USA
                </option>
                <option value="UK" className="text-body dark:text-bodydark">
                  UK
                </option>
                <option value="Canada" className="text-body dark:text-bodydark">
                  Canada
                </option>
              </select>

              <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                <svg
                  className="fill-current"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.8">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                      fill=""
                    ></path>
                  </g>
                </svg>
              </span>
            </div>
            <div className="relative z-20 bg-transparent dark:bg-form-input">
              <select
                value={selectedOption}
                onChange={(e) => {
                  setSelectedOption(e.target.value);
                  changeTextColor();
                }}
                className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 pl-5 pr-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                  isOptionSelected ? 'text-black dark:text-white' : ''
                }`}
              >
                <option
                  value=""
                  disabled
                  className="text-body dark:text-bodydark"
                >
                  Select your subject
                </option>
                <option value="USA" className="text-body dark:text-bodydark">
                  USA
                </option>
                <option value="UK" className="text-body dark:text-bodydark">
                  UK
                </option>
                <option value="Canada" className="text-body dark:text-bodydark">
                  Canada
                </option>
              </select>

              <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                <svg
                  className="fill-current"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.8">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                      fill=""
                    ></path>
                  </g>
                </svg>
              </span>
            </div>
            <div className="relative z-20 bg-transparent dark:bg-form-input">
              <select
                value={selectedOption}
                onChange={(e) => {
                  setSelectedOption(e.target.value);
                  changeTextColor();
                }}
                className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 pl-5 pr-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                  isOptionSelected ? 'text-black dark:text-white' : ''
                }`}
              >
                <option
                  value=""
                  disabled
                  className="text-body dark:text-bodydark"
                >
                  Select your subject
                </option>
                <option value="USA" className="text-body dark:text-bodydark">
                  USA
                </option>
                <option value="UK" className="text-body dark:text-bodydark">
                  UK
                </option>
                <option value="Canada" className="text-body dark:text-bodydark">
                  Canada
                </option>
              </select>

              <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                <svg
                  className="fill-current"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.8">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                      fill=""
                    ></path>
                  </g>
                </svg>
              </span>
            </div>
            <Button
              onClick={() => setIsAddDialogOpen(true)}
              className="ml-auto py-6 px-10"
            >
              Add Account
            </Button>
          </div>
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
                  POSITION
                </th>
                <th className="text-left py-4 px-4 font-medium text-slate-600">
                  RESTAURANT
                </th>
                <th className="text-left py-4 px-4 font-medium text-slate-600">
                  STATUS
                </th>
                <th className="text-left py-4 px-4 font-medium text-slate-600">
                  JOIN DATE
                </th>
                <th className="text-left py-4 px-4 font-medium text-slate-600">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account, key) => (
                <tr className="border-b hover:bg-slate-50" key={key}>
                  <td className="py-4 px-4 text-slate-800">{account.name}</td>
                  <td className="py-4 px-4 text-slate-800">{account.email}</td>
                  <td className="py-4 px-4 text-slate-800">{account.role}</td>
                  <td className="py-4 px-4 text-slate-800">
                    {account.restaurantName}
                  </td>
                  <td className="py-4 px-4">
                    <p
                      className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                        account.status === 'Active'
                          ? 'bg-success text-success'
                          : account.status === 'Inactive'
                          ? 'bg-danger text-danger'
                          : 'bg-warning text-warning'
                      }`}
                    >
                      {account.status}
                    </p>
                  </td>
                  <td className="py-4 px-4 text-slate-800">
                    {account.joinDate}
                  </td>
                  <td className="py-4 px-4 flex justify-center">
                    <button
                      onClick={() => handleEditClick(account)}
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
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                isActive
                className="border-2 border-gray-900"
              >
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <AddAccountDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAddAccount={handleAddAccount}
      />
      <EditAccountDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        account={selectedAccount} // Truyền tài khoản được chọn vào dialog
        onSave={(updatedAccount) => {
          console.log('Updated Account:', updatedAccount);
          setEditDialogOpen(false);
        }}
      />
    </>
  );
};

export default Account;
