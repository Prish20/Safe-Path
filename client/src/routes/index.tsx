import { lazy, ComponentType, Suspense } from 'react';
import { Navigate, useRoutes, RouteObject } from 'react-router-dom';

// Layouts (lazy loaded)
const DashboardLayout = lazy(() => import('@/layouts/DashboardLayout'));

// Pages (lazy loaded)
const SignIn = lazy(() => import('@/components/pages/auth/SignIn'));
const SignUp = lazy(() => import('@/components/pages/auth/Register'));
const DashboardHome = lazy(() => import('@/components/pages/dashboard/Home'));
const NotFound = lazy(() => import('@/components/pages/NotFound'));

// Components
// import Loadable from '@/components/Loadable';

// Route Paths
const AUTH_PATH = {
  login: '/auth/login',
  register: '/auth/register',
};

const DASHBOARD_PATH = {
  home: '/dashboard/home',
};

// Root Redirect Handler
const RootRedirect = () => {
  const isAuthenticated = false;
  return isAuthenticated ? (
    <Navigate to={DASHBOARD_PATH.home} replace />
  ) : (
    <Navigate to={AUTH_PATH.login} replace />
  );
};

// Lazy Loadable Wrapper
const withLoadable = (Component: React.LazyExoticComponent<ComponentType<object>>) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component />
  </Suspense>
);

// Route Configuration
const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootRedirect />,
  },
  // Auth routes without AuthLayout
  { path: 'auth/login', element: withLoadable(SignIn) },
  { path: 'auth/register', element: withLoadable(SignUp) },
  {
    path: 'dashboard',
    element: withLoadable(DashboardLayout),
    children: [
      { index: true, element: <Navigate to={DASHBOARD_PATH.home} replace /> },
      { path: 'home', element: withLoadable(DashboardHome) },
      {
        path: '*',
        element: withLoadable(NotFound),
      },
    ],
  },
  {
    path: '*',
    element: withLoadable(NotFound),
  },
];

/**
 * Define Router for the Application
 * @returns Router Component for Navigation.
 */
export default function Router() {
  return useRoutes(routes);
}
