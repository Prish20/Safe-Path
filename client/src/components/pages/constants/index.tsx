import { DASHBOARD_PATH } from '@/routes/paths';
import {
  FileText,
  LayoutDashboard,
  MapIcon,
  MessageCircle,
} from '@/assets/icons';

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
    image: MessageCircle,
    title: 'Community Engagement',
    className: 'bg-primary-green',
    description: 'Engage with the community.',
    route: DASHBOARD_PATH.communityEngagement,
  },

];
