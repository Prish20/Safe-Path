import { AnimatedLogo } from '@/assets';
import { Link } from 'react-router-dom';

interface LogoHeaderProps {
  className?: string;
}

const LogoHeader = ({ className }: LogoHeaderProps) => {
  return (
    <Link to={'/'}>
      <section className={`flex cursor-pointer items-center gap-3 text-left ${className}`}>
        {/* Logo */}
        <div className="w-[30px] h-[30px] flex-shrink-0">
          <AnimatedLogo />
        </div>

        {/* Text */}
        <div className="flex-shrink-0 min-w-0">
          <h1 className="text-[14px] font-bold text-primary-green whitespace-nowrap">
            Safe-Path Platform
          </h1>
          <p className="mt-1 text-right text-[10px] text-slate-600 whitespace-nowrap">
            ...making our roads safer
          </p>
        </div>
      </section>
    </Link>
  );
};

export default LogoHeader;
