import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { ChevronRight } from 'lucide-react';
import { Badge } from '../../components/ui/badge';

const restaurants = [
  {
    id: 1,
    name: 'Golden Dragon Restaurant',
    address: '123 Main Street, City Center',
    manager: {
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '+1 (555) 123-4567',
      image: '/placeholder-user.jpg',
    },
    employees: [
      {
        id: 1,
        name: 'Alice Johnson',
        email: 'alice@example.com',
        accumulatedTime: '120 hours',
        status: 'Active',
      },
      {
        id: 2,
        name: 'Bob Williams',
        email: 'bob@example.com',
        accumulatedTime: '95 hours',
        status: 'Active',
      },
      {
        id: 3,
        name: 'Carol Davis',
        email: 'carol@example.com',
        accumulatedTime: '110 hours',
        status: 'On Leave',
      },
      {
        id: 4,
        name: 'David Miller',
        email: 'david@example.com',
        accumulatedTime: '85 hours',
        status: 'Active',
      },
      {
        id: 5,
        name: 'Eva Wilson',
        email: 'eva@example.com',
        accumulatedTime: '75 hours',
        status: 'Inactive',
      },
    ],
  },
  {
    id: 2,
    name: 'Silver Spoon Bistro',
    address: '456 Oak Avenue, Downtown',
    manager: {
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      phone: '+1 (555) 987-6543',
      image: '/placeholder-user.jpg',
    },
    employees: [
      {
        id: 1,
        name: 'Frank Brown',
        email: 'frank@example.com',
        accumulatedTime: '130 hours',
        status: 'Active',
      },
      {
        id: 2,
        name: 'Grace Lee',
        email: 'grace@example.com',
        accumulatedTime: '105 hours',
        status: 'Active',
      },
      {
        id: 3,
        name: 'Henry Garcia',
        email: 'henry@example.com',
        accumulatedTime: '90 hours',
        status: 'Inactive',
      },
      {
        id: 4,
        name: 'Ivy Robinson',
        email: 'ivy@example.com',
        accumulatedTime: '115 hours',
        status: 'Active',
      },
    ],
  },
  {
    id: 3,
    name: 'Seaside Grill',
    address: '789 Beach Road, Oceanview',
    manager: {
      name: 'Michael Chen',
      email: 'michael.chen@example.com',
      phone: '+1 (555) 456-7890',
      image: '/placeholder-user.jpg',
    },
    employees: [
      {
        id: 1,
        name: 'Jack Taylor',
        email: 'jack@example.com',
        accumulatedTime: '100 hours',
        status: 'Active',
      },
      {
        id: 2,
        name: 'Kelly Martinez',
        email: 'kelly@example.com',
        accumulatedTime: '85 hours',
        status: 'On Leave',
      },
      {
        id: 3,
        name: 'Leo Anderson',
        email: 'leo@example.com',
        accumulatedTime: '125 hours',
        status: 'Active',
      },
      {
        id: 4,
        name: 'Mia Thomas',
        email: 'mia@example.com',
        accumulatedTime: '95 hours',
        status: 'Active',
      },
      {
        id: 5,
        name: 'Noah White',
        email: 'noah@example.com',
        accumulatedTime: '110 hours',
        status: 'Active',
      },
      {
        id: 6,
        name: 'Olivia Harris',
        email: 'olivia@example.com',
        accumulatedTime: '80 hours',
        status: 'Inactive',
      },
    ],
  },
];
const Employee = () => {
  const [selectedView, setSelectedView] = useState('restaurants');
  const [selectedRestaurant, setSelectedRestaurant] = useState<{
    id: number;
    name: string;
    address: string;
    manager: {
      name: string;
      email: string;
      phone: string;
      image: string;
    };
    employees: {
      id: number;
      name: string;
      email: string;
      accumulatedTime: string;
      status: string;
    }[];
  } | null>(null);

  const handleRestaurantClick = (restaurant: {
    id: number;
    name: string;
    address: string;
    manager: { name: string; email: string; phone: string; image: string };
    employees: {
      id: number;
      name: string;
      email: string;
      accumulatedTime: string;
      status: string;
    }[];
  }) => {
    setSelectedRestaurant(restaurant);
    setSelectedView('employees');
  };

  const handleBackToRestaurants = () => {
    setSelectedRestaurant(null);
    setSelectedView('restaurants');
  };
  return (
    <>
      <Breadcrumb pageName="Employee" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {restaurants.map((restaurant) => (
          <Card
            key={restaurant.id}
            className="cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => handleRestaurantClick(restaurant)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {restaurant.name}
              </CardTitle>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                {restaurant.address}
              </div>
              <div className="mt-2 flex items-center gap-2">
                <Badge variant="outline">
                  {restaurant.employees.length} Employees
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Employee;
