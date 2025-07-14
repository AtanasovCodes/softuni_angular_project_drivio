export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface UserResponse {
  token: string;
  user: User;
}
