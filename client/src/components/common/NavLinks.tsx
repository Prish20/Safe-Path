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
        'flex items-center rounded-lg text-sm transition-all hover:bg-accent',
        isActive
          ? 'text-primary-foreground hover:bg-primary/90'
          : 'text-muted-foreground',
        collapsed ? 'justify-center px-2 py-2' : 'gap-3 px-3 py-2',
        className
      )}
    >
      <Icon size={20} />
      {!collapsed && <span>{label}</span>}
    </a>
  );
};

export default NavLink;
