import { paths } from 'constants/paths.constants';

export const LINKS = [
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
