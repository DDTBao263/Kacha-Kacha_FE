import { Button } from '../../components/ui/button';
import { useState } from 'react';
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

const EmpManagement = () => {
  const [restaurant, setRestaurant] = useState<Store | null>(null);
  const [selectedView, setSelectedView] = useState('restaurants');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

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
          <h1 className="font-semibold text-lg md:text-2xl">Kacha-Kacha</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Restaurant Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <h3 className="text-lg font-medium">Store Details</h3>
                <p className="text-sm text-muted-foreground mt-2">Vinhome</p>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium">Store Manager</h3>
                <div className="flex items-center gap-4 mt-2">
                  <div>
                    <p className="font-medium">Bao</p>
                    <p className="text-sm text-muted-foreground">
                      baococcodon2603@gmail.com
                    </p>
                    <p className="text-sm text-muted-foreground">0333360778</p>
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
          {/* <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Accumulated Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedRestaurant.employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">{employee.name}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.accumulatedTime}</TableCell>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent> */}
        </Card>
      </div>
    </>
  );
};

export default EmpManagement;
