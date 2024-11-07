import { useAppSelector } from "@/hooks/useRedux";
import { lazy, ComponentType, Suspense } from "react";
import { Navigate, useRoutes, RouteObject } from "react-router-dom";
import AuthGuard from "@/components/AuthGuard";
import { AUTH_PATH, DASHBOARD_PATH, RESET_PASSWORD_PATH } from "./paths";

// Layouts (lazy loaded)
const DashboardLayout = lazy(() => import("@/layouts/DashboardLayout"));

// Pages (lazy loaded)
const SignIn = lazy(() => import("@/components/pages/auth/SignIn"));
const SignUp = lazy(() => import("@/components/pages/auth/Register"));
const ResetPassword = lazy(
  () => import("@/components/pages/auth/ResetPassword")
);
const DashboardHome = lazy(() => import("@/components/pages/dashboard/Home"));
const IncidentReporting = lazy(
  () => import("@/components/pages/dashboard/IncidentReporting")
);
const Map = lazy(() => import("@/components/pages/dashboard/MapNavigation"));
const NotFound = lazy(() => import("@/components/pages/NotFound"));
const CommunityEngagement = lazy(
  () => import("@/components/pages/dashboard/CommunityEngagement")
);
const IncidentDetails = lazy(
  () => import("@/components/pages/dashboard/IncidentDetails")
);

// Components
// import Loadable from '@/components/Loadable';

// Root Redirect Handler
const RootRedirect = () => {
  const { isAuthenticated } = useAppSelector((state) => state.user);
  return isAuthenticated ? (
    <Navigate to={DASHBOARD_PATH.home} replace />
  ) : (
    <Navigate to={AUTH_PATH.login} replace />
  );
};

// Lazy Loadable Wrapper
const withLoadable = (
  Component: React.LazyExoticComponent<ComponentType<object>>
) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component />
  </Suspense>
);

// Route Configuration
const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootRedirect />,
  },
  // Auth routes without AuthLayout
  { path: AUTH_PATH.login, element: withLoadable(SignIn) },
  { path: AUTH_PATH.register, element: withLoadable(SignUp) },
  {
    path: RESET_PASSWORD_PATH.root,
    children: [
      { index: true, element: withLoadable(ResetPassword) },
      { path: ":token", element: withLoadable(ResetPassword) },
    ],
  },
  {
    path: DASHBOARD_PATH.root,
    element: <AuthGuard>{withLoadable(DashboardLayout)}</AuthGuard>,
    children: [
      { index: true, element: <Navigate to={DASHBOARD_PATH.home} replace /> },
      { path: "home", element: withLoadable(DashboardHome) },
      { path: "incident-reporting", element: withLoadable(IncidentReporting) },
      { path: "map", element: withLoadable(Map) },
      {
        path: "community-engagement",
        element: withLoadable(CommunityEngagement),
      },
      { path: "incident/:id", element: withLoadable(IncidentDetails) },
      {
        path: "*",
        element: withLoadable(NotFound),
      },
    ],
  },
  {
    path: "*",
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
