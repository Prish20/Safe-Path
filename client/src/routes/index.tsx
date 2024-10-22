import { lazy } from "react";

// dom router
import { Navigate, useRoutes } from "react-router-dom";

// layouts
import AuthLayout from "@/layouts/AuthLayout";
import DashboardLayout from "@/layouts/DashboardLayout";

// components
import Loadable from "@/components/Loadable";
import NotFound from "@/components/pages/NotFound";
// import SignIn from ;

// Import Components
const SignIn = Loadable(lazy(() => import("@/components/pages/auth/SignIn")));
const SignUp = Loadable(lazy(() => import("@/components/pages/auth/Register")));

// DASHBOARD
const DashboardHome = Loadable(
  lazy(() => import("@/components/pages/dashboard/Home"))
);

/**
 * Define Root Redirect
 */
// Root redirection component
const RootRedirect = () => {
  // Check Auth Status and redirect appropriately
  const isAuthenticated = false;
  return isAuthenticated ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/auth/login" replace />
  );
};

/**
 * Define Router for the Application
 * @returns Router Component for Navigation.
 */
export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <RootRedirect />,
    },
    {
      path: "auth",
      element: <AuthLayout />,
      children: [
        { index: true, element: <Navigate to="/auth/login" replace /> },
        { path: "login", element: <SignIn /> },
        { path: "register", element: <SignUp /> },
      ],
    },
    {
      path: "dashboard",
      element: <DashboardLayout />,
      children: [
        { index: true, element: <Navigate to="/dashboard/home" replace /> },
        { path: "home", element: <DashboardHome /> },

        {
          path: "*",
          element: (
            <NotFound
              route="/dashboard/home"
              buttonText="Back to dashboard"
              subtext="Route does not exist. Please confirm."
            />
          ),
        },
      ],
    },
    { path: "*", element: <NotFound /> },
  ]);
}
