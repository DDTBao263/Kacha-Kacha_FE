import { lazy } from 'react';
import { RouteObject, Outlet } from 'react-router-dom';

// Import Layouts
import DefaultLayout from '../components/layout/DefaultLayout';
import OutLayout from '../components/layout/AuthLayout';

// Authentication
const SignIn = lazy(() => import('../pages/Authentication/SignIn'));

// Admin
const AdminDashboard = lazy(() => import('../pages/Dashboard/AdminDashboard'));
const Store = lazy(() => import('../pages/Store/Stores'));
const Account = lazy(() => import('../pages/Account/Account'));

// RM
const RestaurantDash = lazy(() => import('../pages/Dashboard/RestaurantDash'));
const Employee = lazy(() => import('../pages/Employee/Employee'));
const Reports = lazy(() => import('../pages/Report/Report'));

// SM
const StoreDash = lazy(() => import('../pages/Dashboard/StoreDash'));
const Attendance = lazy(() => import('../pages/Attendance/Attendance'));
const LeaveRequest = lazy(() => import('../pages/LeaveRequest/LeaveRequest'));
const Schedule = lazy(() => import('../pages/Schedule/Schedule'));

// Template
const Profile = lazy(() => import('../pages/Profile/Profile'));
const NotFound = lazy(() => import('../pages/NotFound'));


// Routes for authentication (Sign In & Sign Up)
export const authRoutes: RouteObject[] = [
  {
    path: '/auth',
    element: (
      <OutLayout>
        <Outlet />
      </OutLayout>
    ),
    children: [
      { path: 'signin', element: <SignIn /> },

    ],
  },
];

// Routes for main dashboard
export const appRoutes: RouteObject[] = [
  {
    path: '/',
    element: (
      <DefaultLayout>
        <Outlet />
      </DefaultLayout>
    ),
    children: [
      // Admin
      { index: true, path: 'admindash', element: <AdminDashboard /> },
      { path: 'store', element: <Store /> },
      { path: 'account', element: <Account /> },
      // RM
      { path: 'restaurantdash', element: <RestaurantDash /> },
      { path: 'employee', element: <Employee /> },
      { path: 'reports', element: <Reports /> },
      // SM
      { path: 'storedash', element: <StoreDash /> },
      { path: 'leaverequest', element: <LeaveRequest /> },
      { path: 'schedule', element:  <Schedule /> },
      { path: 'attendance', element: <Attendance /> },

      //TEAMPLATE
      { path: 'profile', element: <Profile /> },
 
    ],
  },
];

// Combine all routes
export const allRoutes: RouteObject[] = [
  ...authRoutes,
  ...appRoutes,
  {
    path: '*',
    element: (
      <NotFound />
    ),
  },
];
