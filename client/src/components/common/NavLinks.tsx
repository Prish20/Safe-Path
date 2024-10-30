import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NavLinkProps {
  route: string;
  pathname: string;
  label: string;
  Icon: LucideIcon;
  collapsed: boolean;
  className?: string;
}

/**
 * Navigation Link Component
 * @returns Navigation Link
 */

const NavLink = ({
  route,
  pathname,
  label,
  Icon,
  collapsed,
  className,
}: NavLinkProps) => {
  const navigate = useNavigate();
  const isActive = pathname === route;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(route);
  };

  return (
    <a
      href={route}
      onClick={handleClick}
      className={cn(
        'flex items-center rounded-lg text-sm transition-all hover:bg-accent flex-shrink-0',
        isActive
          ? 'text-white hover:bg-green-500 bg-emerald-500/20'
          : 'text-white',
        collapsed ? 'justify-center px-2 py-2' : 'gap-3 px-3 py-2',
        className
      )}
    >
      <Icon size={20} className="text-green-500 flex-shrink-0" />
      {!collapsed && <span className='flex-shrink-0'>{label}</span>}
    </a>
  );
};

export default NavLink;
