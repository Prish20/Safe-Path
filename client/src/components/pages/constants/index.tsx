import { DASHBOARD_PATH } from '@/routes/paths';
import {
  LayoutDashboard,
} from '@/assets/icons';

import { Chat3D } from '@/assets';

export const navigationLinks = [
  {
    label: 'Dashboard',
    route: DASHBOARD_PATH.home,
    icon: LayoutDashboard,
  },
];

export const quickShortcuts = [
  {
    image: Chat3D,
    title: 'Chat With AI',
    className: 'bg-primary-green',
    description: 'Start a conversation to learn about your plants, and more.',
    route: DASHBOARD_PATH.home,
  },
];
