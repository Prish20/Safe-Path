import { formatCustomDate, getTimeOfDayGreeting } from '@/lib/utils';

type HeaderProp = {
  username: string;
};

const DashboardHeader: React.FC<HeaderProp> = ({ username }) => {
  return (
    <section className="flex cursor-default justify-between">
      <div>
        <h2 className="text-2xl font-bold text-green-500">
          Welcome back, {username}
        </h2>
        <p className="text-sm text-white">Let's get started.</p>
      </div>

      <div className="text-right text-green-500">
        <p>{getTimeOfDayGreeting()}!</p>
        <p className="text-sm font-medium text-white">
          {formatCustomDate(new Date())}
        </p>
      </div>
    </section>
  );
};

export default DashboardHeader;
