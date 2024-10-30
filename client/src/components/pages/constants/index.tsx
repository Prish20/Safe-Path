import { DASHBOARD_PATH } from '@/routes/paths';
import {
  FileText,
  LayoutDashboard,
  MapIcon,
  MessageCircle,
} from '@/assets/icons';

import { Chat3D } from '@/assets';

export const navigationLinks = [
  {
    label: 'Dashboard',
    route: DASHBOARD_PATH.home,
    icon: LayoutDashboard,
  },
  {
    label: 'Incident Reporting',
    route: DASHBOARD_PATH.incidentReporting,
    icon: FileText,
  },
  {
    label: 'Map',
    route: DASHBOARD_PATH.map,
    icon: MapIcon,
  },
  {
    label: 'Community Engagement',
    route: DASHBOARD_PATH.communityEngagement,
    icon: MessageCircle,
  }
  
];

export const quickShortcuts = [
  {
    image: Chat3D,
    title: 'Chat With AI',
    className: 'bg-primary-green',
    description: 'Start a conversation to learn about your plants, and more.',
    route: DASHBOARD_PATH.home,
  },
  {
    image: FileText,
    title: 'Report an Incident',
    className: 'bg-primary-green',
    description: 'Report an incident to the authorities.',
    route: DASHBOARD_PATH.incidentReporting,
  },
  {
    image: MapIcon,
    title: 'View Map',
    className: 'bg-primary-green',
    description: 'View the map of the area.',
    route: DASHBOARD_PATH.map,
  },
  {
    image: Chat3D,
    title: 'Community Engagement',
    className: 'bg-primary-green',
    description: 'Engage with the community.',
    route: DASHBOARD_PATH.communityEngagement,
  },

];
