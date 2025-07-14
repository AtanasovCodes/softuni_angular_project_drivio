export const paths = {
  register: 'users/register',
  login: 'users/login',
  profile: 'users/profile',
  profileRentals: 'users/profile/rentals',
  logout: 'logout',
  home: 'home',
  cars: 'cars',
  rentCar: (id: string) => `rent/${id}`,
  carDetails: (id: string) => `cars/details/${id}`,
  contacts: 'contacts',
  notFound: 'not-found',
} as const;
