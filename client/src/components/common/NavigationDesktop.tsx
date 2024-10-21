import { useLocation } from 'react-router-dom';
import { navigationLinks } from '../../pages/dashboard/constants/index';
import LogoHeader from './LogoHeader';
import NavLink from './NavLinks';

/**
 * Nagivation Desktop
 * @returns Navigation Component for the Desktop View > 600px
 */

const NavigationDesktop = () => {
  const pathname = useLocation().pathname;

  return (
    <aside className="hidden h-auto w-[300px] min-w-[250px] md:min-w-[300px] flex-col justify-between overflow-y-auto bg-red-500 p-6 sm:flex">
      <section>
        {/* Logo Header */}
        <LogoHeader />

        {/* Navigation */}
        <nav role="navigation" aria-label="Sidebar Navigation">
          <ul className="flex flex-col gap-2">
            {navigationLinks.map((link, index) => (
              <NavLink
                key={index}
                route={link.route}
                pathname={pathname}
                label={link.label}
                Icon={link.icon}
              />
            ))}
          </ul>
        </nav>
      </section>
    </aside>
  );
};

export default NavigationDesktop;
