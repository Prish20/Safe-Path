import Separator from '@/components/common/Separator';
import { quickShortcuts } from './constants';
import QuickLink from '@/components/dashboard-home/QuickLink';
import DashboardHeader from '@/components/dashboard-home/DashboardHeader';
import SectionHeader from '@/components/common/SectionHeader';

/**
 * Dashboard Overview
 * @returns
 */
export default function DashboardHome() {
  const user = {
    name: 'Christadrian',
  };

  // Render Widgets
  return (
    <div className="scrollbar-thin h-full w-full p-8">
      <DashboardHeader username={user.name} />

      <Separator className="h-[2px] bg-slate-300" />

      <section className="flex flex-wrap gap-3">
      </section>

      {/* Shortcut to Other Sections */}
      <SectionHeader title="Quick Shortcuts" />

      <section className="flex flex-wrap gap-4 md:justify-start justify-center">
        {quickShortcuts.map((item, index) => (
          <QuickLink
            key={index}
            image={item.image}
            title={item.title}
            className={item.className}
            description={item.description}
            route={item.route}
          />
        ))}
      </section>
    </div>
  );
}
