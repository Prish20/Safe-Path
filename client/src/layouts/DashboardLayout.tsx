import { Outlet } from 'react-router-dom';
import NavigationDesktop from '@/components/common/NavigationDesktop';
import NavigationMobile from '@/components/common/NavigationMobile';
import LogoHeader from '@/components/common/LogoHeader';
import { Menu } from 'lucide-react';
import { useState } from 'react';

// Dashboard Layout Component
const DashboardLayout = () => {
  const [showMobileNav, setShowMobileNav] = useState(false);
  return (
    <main className="flex h-screen w-full max-w-[1350px] gap-0 overflow-hidden bg-gray-neutral font-poppins sm:h-[calc(100dvh-80px)] sm:rounded-lg">
      <NavigationDesktop />
      <section className="flex-1 overflow-y-auto scrollbar-hide sm:scrollbar-thin">
        {/* Mobile Header */}
        <div
          className="sm:hidden flex justify-between p-5 sm:pt-8 cursor-pointer bg-gray-900"
          onClick={() => setShowMobileNav((prev) => !prev)}
        >
          <LogoHeader className="text-white" />
          <Menu
            size={32}
            color="green"
            className="hover:opacity-80 transition-opacity duration-300 z-30"
          />
        </div>

        <NavigationMobile
          showNav={showMobileNav}
          setShowNav={setShowMobileNav}
        />

        {/* Render Children layout nested within the dashboard */}
        <Outlet />
      </section>
    </main>
  );
};

export default DashboardLayout;
