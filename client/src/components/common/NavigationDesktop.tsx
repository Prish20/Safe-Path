import { useState } from "react";
import LogoHeader from "@/components/common/LogoHeader";
import { useLocation } from "react-router-dom";
import NavLink from "@/components/common/NavLinks";
import { navigationLinks } from "../pages/constants";
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { User, LogOut, ChevronsRight, ChevronsLeft } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { handleLogout } from "@/user/userThunks";

/**
 * Navigation Desktop
 * @returns Navigation Component for the Desktop View > 600px
 */
const NavigationDesktop = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { pathname } = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: RootState) => state.user.currentUser);

  const handleCollapseToggle = () => {
    setIsCollapsed((prevState) => !prevState);
  };

  const onLogoutClick = () => {
    dispatch(handleLogout());
  };

  return (
    <aside
      aria-label="Main Navigation"
      className={cn(
        "h-full bg-gray-900 hidden md:block text-white overflow-hidden",
        "transition-width duration-500 ease-in-out",
        isCollapsed ? "w-16" : "w-72"
      )}
      style={{ transitionProperty: "width" }}
    >
      <div className="flex h-full flex-col justify-between px-2 py-4">
        {/* Logo and Toggle */}
        <div className="flex items-center justify-between mb-6 flex-shrink-0">
          {!isCollapsed && <LogoHeader className="text-white flex-shrink-0" />}
          <button
            onClick={handleCollapseToggle}
            className="rounded-md p-2 text-green-500 flex-shrink-0 mr-2 ml-2"
            aria-label="Toggle Navigation"
          >
            {isCollapsed ? (
              <ChevronsRight size={20} />
            ) : (
              <ChevronsLeft size={20} />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav
          role="navigation"
          aria-label="Sidebar Navigation"
          className="flex-1 overflow-hidden"
        >
          <TooltipProvider>
            <ul className="flex flex-col gap-2">
              {navigationLinks.map((link, index) => (
                <li key={index}>
                  {isCollapsed ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <NavLink
                            route={link.route}
                            pathname={pathname}
                            label={link.label}
                            Icon={link.icon}
                            className="flex items-center gap-4 p-2 hover:bg-green-700 rounded-md flex-shrink-0 text-green-500"
                            collapsed={isCollapsed}
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent 
                        side="right" 
                        align="start"
                        sideOffset={20}
                        className="bg-green-500 z-50 font-semibold text-white p-2 rounded-md"
                      >
                        {link.label}
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <NavLink
                      route={link.route}
                      pathname={pathname}
                      label={link.label}
                      Icon={link.icon}
                      className="flex items-center gap-4 p-2 hover:bg-green-700 rounded-md flex-shrink-0"
                      collapsed={isCollapsed}
                    />
                  )}
                </li>
              ))}
            </ul>
          </TooltipProvider>
        </nav>

        {/* Profile Section */}
        <div className="flex items-center gap-4 border-t border-green-600 pt-4 mt-4 flex-shrink-0">
          <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
            <User size={20} className="text-white" />
          </div>
          {!isCollapsed && (
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate">
                {user ? `${user.firstName} ${user.lastName}` : "Guest"}
              </p>
              <p className="text-xs text-gray-300 truncate">
                {user?.email || "Not signed in"}
              </p>
            </div>
          )}
          <div className="min-w-0">
            {!isCollapsed && (
              <button
                onClick={onLogoutClick}
                className="rounded-md p-2 hover:bg-red-800 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-900 focus:ring-red-500"
                aria-label="Logout"
              >
                <LogOut size={20} className="text-white " />
              </button>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default NavigationDesktop;
