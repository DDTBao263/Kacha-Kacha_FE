import { lazy } from 'react';
import { RouteObject, Outlet } from 'react-router-dom';

// Import Layouts
import DefaultLayout from '../components/layout/DefaultLayout';
import OutLayout from '../components/layout/AuthLayout';

// Lazy load pages
const SignIn = lazy(() => import('../pages/Authentication/SignIn'));
const SignUp = lazy(() => import('../pages/Authentication/SignUp'));
const Calendar = lazy(() => import('../pages/Calendar'));
const Chart = lazy(() => import('../pages/Chart'));
const ECommerce = lazy(() => import('../pages/Dashboard/ECommerce'));
const RestaurantDash = lazy(() => import('../pages/Dashboard/RestaurantDash'));
const FormElements = lazy(() => import('../pages/Form/FormElements'));
const FormLayout = lazy(() => import('../pages/Form/FormLayout'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const Tables = lazy(() => import('../pages/Tables'));
const Alerts = lazy(() => import('../pages/UiElements/Alerts'));
const Buttons = lazy(() => import('../pages/UiElements/Buttons'));
const AdminDashboard = lazy(() => import('../pages/Dashboard/AdminDashboard'));
const Store = lazy(() => import('../pages/Store/Stores'));


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
      { path: 'signup', element: <SignUp /> },
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
      { index: true, element: <ECommerce /> },
      { path: 'settings', element: <Settings /> },
      { path: 'tables', element: <Tables /> },
      { path: 'chart', element: <Chart /> },
      { path: 'admindash', element: <AdminDashboard /> },
      { path: 'restaurantdash', element: <RestaurantDash /> },
      { path: 'calendar', element: <Calendar /> },
      { path: 'forms/form-elements', element: <FormElements /> },
      { path: 'forms/form-layout', element: <FormLayout /> },
      { path: 'profile', element: <Profile /> },
      { path: 'ui/alerts', element: <Alerts /> },
      { path: 'ui/buttons', element: <Buttons /> },
      { path: 'store', element: <Store /> }
    ],
  },
];

// Combine all routes
export const allRoutes: RouteObject[] = [...authRoutes, ...appRoutes];
