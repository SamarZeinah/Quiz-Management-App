//Login
export interface LoginValues {
  email: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  role: string;
}
export interface RegisterValues {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
  
}