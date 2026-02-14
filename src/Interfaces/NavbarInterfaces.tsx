export interface NavbarProps {
  pageTitle: string;
  userName: string;
  userRole: string;
  userInitials: string;
  
}

export interface User {
  first_name?: string
  last_name?: string
  role?: string
}