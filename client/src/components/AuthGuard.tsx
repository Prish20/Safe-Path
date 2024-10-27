import { AUTH_PATH } from "@/routes/paths";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "@/hooks/useRedux";

type AuthGuardProps = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated } = useAppSelector((state) => state.user);
  const { pathname } = useLocation();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to={AUTH_PATH.login} state={{ from: pathname }} replace />;
  }

  return <>{children}</>;
}
