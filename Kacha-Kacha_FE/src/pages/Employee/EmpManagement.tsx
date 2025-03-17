import { Button } from '../../components/ui/button';
import { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { useNavigate, useParams } from 'react-router-dom';
import { Store } from '../../types/store';
import { storeService } from '../../services/store';
import { EMPLOYEE } from '../../types/employee';
import { employeeService } from '../../services/employee';

const EmpManagement = () => {
  const [restaurant, setRestaurant] = useState<Store | null>(null);
  const [employees, setEmployees] = useState<EMPLOYEE[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchRestaurantData(parseInt(id, 10));
    }
  }, [id]);

  useEffect(() => {
    if (restaurant) {
      fetchEmployees(restaurant.id);
    }
  }, [restaurant]);

  const fetchRestaurantData = async (storeId: number) => {
    try {
      const response = await storeService.getStoreById(storeId);

      const store = response.data.data;

      console.log(store);

      setRestaurant({
        id: store.id,
        name: `Kacha-Kacha ${store.location}`,
        location: store.location,
        phoneNumber: store.phoneNumber,
        status: store.status,
        storeManager: store.storeManager,
      });
    } catch (error) {
      console.error('Failed to fetch restaurant data:', error);
    }
  };

  const fetchEmployees = async (restaurantId: number) => {
    try {
      const response = await employeeService.getEmpByRestaurantId(restaurantId);

      const employee =
        response.data.data.content?.map((employee: any) => ({
          employeeId: employee.id,
          name: employee.name,
          email: employee.email,
          phoneNumber: employee.phoneNumber || '-',
          address: employee.address || '-',
          status: employee.status,
        })) || [];
      setEmployees(employee);
    } catch (error) {
      console.error('Failed to fetch accounts:', error);
    }
  };

  const handleBackToRestaurants = () => {
    navigate(`/restaurantManager/restaurants`);
  };
  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={handleBackToRestaurants}>
            <ChevronRight className="mr-2 h-4 w-4 rotate-180" />
            Back to Restaurants
          </Button>
          <h1 className="font-semibold text-lg md:text-2xl">
            {restaurant ? restaurant.name : 'Loading...'}
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Restaurant Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <h3 className="text-lg font-medium">Store Details</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Address: {restaurant ? restaurant.location : 'Loading...'}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Phone: {restaurant ? restaurant.phoneNumber : 'Loading...'}
                </p>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium">Store Manager</h3>
                <div className="flex items-center gap-4 mt-2">
                  <div>
                    <p className="font-medium">
                      Name:{' '}
                      {restaurant ? restaurant.storeManager.name : 'Loading...'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Email:{' '}
                      {restaurant
                        ? restaurant.storeManager.email
                        : 'Loading...'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Employee List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>View</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.length > 0 ? (
                  employees.map((employee) => (
                    <TableRow key={employee.employeeId}>
                      <TableCell className="font-medium">
                        {employee.name}
                      </TableCell>
                      <TableCell>{employee.email}</TableCell>
                      <TableCell>{employee.phoneNumber}</TableCell>
                      <TableCell>{employee.address}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            employee.status === 'Active'
                              ? 'default'
                              : employee.status === 'On Leave'
                              ? 'outline'
                              : 'secondary'
                          }
                        >
                          {employee.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
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
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      No employees found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default EmpManagement;
