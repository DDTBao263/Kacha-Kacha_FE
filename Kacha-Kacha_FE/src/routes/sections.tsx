import { lazy } from 'react';
import { RouteObject, Outlet } from 'react-router-dom';

// Import Layouts
import DefaultLayout from '../components/layout/DefaultLayout';
import OutLayout from '../components/layout/AuthLayout';

// Lazy load pages
const NotFound = lazy(() => import('../pages/NotFound'));
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
const Leave = lazy(() => import('../pages/Leave/Leave'));
const Shift = lazy(() => import('../pages/Shift/Shift'));

// Template
const Calendar = lazy(() => import('../pages/Calendar'));
const Chart = lazy(() => import('../pages/Chart'));
const FormElements = lazy(() => import('../pages/Form/FormElements'));
const FormLayout = lazy(() => import('../pages/Form/FormLayout'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const Tables = lazy(() => import('../pages/Tables'));
const Alerts = lazy(() => import('../pages/UiElements/Alerts'));
const Buttons = lazy(() => import('../pages/UiElements/Buttons'));


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
      { index: true, path:'admindash',element: <AdminDashboard /> },
      { path: 'store', element: <Store /> },
      { path: 'account', element: <Account /> },
      // RM
      { path: 'restaurantdash', element: <RestaurantDash /> },
      { path : 'employee', element: <Employee /> },
      { path : 'reports', element: <Reports /> },
      // SM
      { path:  'storedash', element: <StoreDash /> },
      { path : 'leave', element: <Leave /> },
      { path : 'shift', element: <Shift /> },
      { path : 'attendance', element: <Attendance /> },

      //TEAMPLATE
      { path: 'settings', element: <Settings /> },
      { path: 'tables', element: <Tables /> },
      { path: 'chart', element: <Chart /> },
      { path: 'calendar', element: <Calendar /> },
      { path: 'forms/form-elements', element: <FormElements /> },
      { path: 'forms/form-layout', element: <FormLayout /> },
      { path: 'profile', element: <Profile /> },
      { path: 'ui/alerts', element: <Alerts /> },
      { path: 'ui/buttons', element: <Buttons /> }
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
