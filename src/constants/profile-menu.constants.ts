import { paths } from './paths.constants';

export const PROFILE_MENU_LINKS = [
  {
    name: 'Profile',
    path: `/${paths.profile}`,
  },
  {
    name: 'My Rentals',
    path: `/${paths.profileRentals}`,
  },
  {
    name: 'Logout',
    path: `/${paths.logout}`,
  },
] as const;
