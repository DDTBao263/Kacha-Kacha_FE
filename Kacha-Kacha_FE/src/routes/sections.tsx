import { lazy } from 'react';
import { RouteObject, Outlet, Navigate } from 'react-router-dom';
import { PrivateRoute } from './PrivateRouter';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

// Import Layouts
import DefaultLayout from '../components/layout/DefaultLayout';
import OutLayout from '../components/layout/AuthLayout';

// Authentication
const SignIn = lazy(() => import('../pages/Authentication/SignIn'));

// Admin
const AdminDashboard = lazy(() => import('../pages/Dashboard/AdminDashboard'));
const Store = lazy(() => import('../pages/Store/Stores'));
const Account = lazy(() => import('../pages/Account/Account'));

// Restaurant Manager
const RestaurantDash = lazy(() => import('../pages/Dashboard/RestaurantDash'));
const Employee = lazy(() => import('../pages/Employee/Employee'));
const Reports = lazy(() => import('../pages/Report/Report'));

// Store Manager
const StoreDash = lazy(() => import('../pages/Dashboard/StoreDash'));
const Attendance = lazy(() => import('../pages/Attendance/Attendance'));
const LeaveRequest = lazy(() => import('../pages/LeaveRequest/LeaveRequest'));
const Schedule = lazy(() => import('../pages/Schedule/Schedule'));

// Common Pages
const Profile = lazy(() => import('../pages/Profile/Profile'));
const NotFound = lazy(() => import('../pages/NotFound'));

const RedirectBasedOnUserRole = () => {
  const jwtToken = localStorage.getItem('jwtToken');
  const userType = useSelector((state: RootState) => state.auth.user?.userType);

  if (!jwtToken) {
    return <Navigate to="/auth/signin" replace />;
  }

  switch (userType) {
    case 'ADMIN':
      return <Navigate to="/admin/admindash" replace />;
    case 'RESTAURANT_MANAGER':
      return <Navigate to="/restaurant/resdash" replace />;
    case 'STORE_MANAGER':
      return <Navigate to="/storemanager/storedash" replace />;
    default:
      return <Navigate to="/auth/signin" replace />;
  }
};

export const authRoutes: RouteObject[] = [
  {
    path: '/auth',
    element: (
      <OutLayout>
        <Outlet />
      </OutLayout>
    ),
    children: [{ path: 'signin', element: <SignIn /> }],
  },
];


export const appRoutes: RouteObject[] = [
  {
    path: '/',
    element: (
      <DefaultLayout>
        <Outlet />
      </DefaultLayout>
    ),
    children: [
      { index: true, element: <RedirectBasedOnUserRole /> },
      {
        path: 'admin',
        element: <PrivateRoute allowedUserTypes={['ADMIN']} />,
        children: [
          { index: true, path: 'admindash', element: <AdminDashboard /> },
          { path: 'store', element: <Store /> },
          { path: 'account', element: <Account /> },
        ],
      },
      {
        path: 'restaurant',
        element: <PrivateRoute allowedUserTypes={['RESTAURANT_MANAGER']} />,
        children: [
          { index: true, path: 'resdash', element: <RestaurantDash /> },
          { path: 'employee', element: <Employee /> },
          { path: 'reports', element: <Reports /> },
        ],
      },
      {
        path: 'storemanager',
        element: <PrivateRoute allowedUserTypes={['STORE_MANAGER']} />,
        children: [
          { index: true, path: 'storedash', element: <StoreDash /> },
          { path: 'leaverequest', element: <LeaveRequest /> },
          { path: 'schedule', element: <Schedule /> },
          { path: 'attendance', element: <Attendance /> },
        ],
      },
      { path: 'profile', element: <Profile /> },
    ],
  },
];


export const allRoutes: RouteObject[] = [
  ...authRoutes,
  ...appRoutes,
  { path: '*', element: <NotFound /> },
];
