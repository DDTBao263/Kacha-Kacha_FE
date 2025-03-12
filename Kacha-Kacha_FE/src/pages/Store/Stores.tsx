import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { storeService } from '../../services/store';
import { Button } from '../../components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../components/ui/pagination';
import { AddStoreDialog } from './NewStore';

interface Store {
  id: number;
  name: string;
  location: string;
  phoneNumber: string;
  status: string;
}

const Stores = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchStores = async (page: number, size: number = 10) => {
    try {
      const response = await storeService.getAllStores(page - 1, size);
      const storesData =
        response.data.data.content?.map((store: any, index: number) => ({
          id: index + 1,
          name: `Kacha-Kacha ${index + 1}`,
          location: store.location,
          phoneNumber: store.phoneNumber,
          status: store.status,
        })) || [];
      setStores(storesData);
      const total = response.data.data.totalPages || 1;
      setTotalPages(total); // Assuming totalPages is available in the API response
    } catch (error) {
      console.error('Failed to fetch stores:', error);
    }
  };

  useEffect(() => {
    const fetchData = () => fetchStores(currentPage, 10);

    fetchData(); // Gọi ngay khi component mount hoặc currentPage thay đổi

    window.addEventListener('refreshStores', fetchData);
    return () => window.removeEventListener('refreshStores', fetchData);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  // const handleAddStore = async (newStore: {
  //   location: string;
  //   phoneNumber: string;
  // }) => {
  //   const store: Store = {
  //     id: stores.length + 1,
  //     name: `Kacha-Kacha ${stores.length + 1}`,
  //     location: newStore.location,
  //     phoneNumber: newStore.phoneNumber,
  //     status: 'OPEN', // Assuming new stores have an 'OPEN' status by default
  //   };

  //   setStores([...stores, store]);
  //   setIsAddDialogOpen(false);
  // };

  return (
    <>
      <Breadcrumb pageName="Store" />
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by name, location..."
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="ml-auto py-6 px-10"
          >
            Add Store
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b bg-gray-2 dark:bg-meta-4">
                <th className="text-left py-4 px-4 font-medium text-slate-600">
                  STT
                </th>
                <th className="text-left py-4 px-4 font-medium text-slate-600">
                  NAME
                </th>
                <th className="text-left py-4 px-4 font-medium text-slate-600">
                  LOCATION
                </th>
                <th className="text-left py-4 px-4 font-medium text-slate-600">
                  PHONE NUMBER
                </th>
                <th className="text-left py-4 px-4 font-medium text-slate-600">
                  STATUS
                </th>
                <th className="text-left py-4 px-4 font-medium text-slate-600">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {stores.map((store) => (
                <tr className="border-b hover:bg-slate-50" key={store.id}>
                  <td className="py-4 px-4 text-slate-800">{store.id}</td>
                  <td className="py-4 px-4 text-slate-800">{store.name}</td>
                  <td className="py-4 px-4 text-slate-800">{store.location}</td>
                  <td className="py-4 px-4 text-slate-800">
                    {store.phoneNumber}
                  </td>
                  <td className="py-4 px-4">
                    <p
                      className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                        store.status === 'OPEN'
                          ? 'bg-success text-success'
                          : store.status === 'CLOSED'
                          ? 'bg-danger text-danger'
                          : 'bg-warning text-warning'
                      }`}
                    >
                      {store.status}
                    </p>
                  </td>
                  <td className="py-4 px-4 flex justify-center">
                    <button
                      // onClick={() => handleEditClick(account)}
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
      <AddStoreDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />
    </>
  );
};

export default Stores;
