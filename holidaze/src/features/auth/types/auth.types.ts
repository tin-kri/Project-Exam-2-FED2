export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  venueManager: boolean;
}

export interface AuthRegisterValues {
  name: string;
  email: string;
  password: string;
  venueManager: boolean;
  bio?: string;
  avatar?: {
    url: string;
    alt?: string;
  };
  banner?: {
    url: string;
    alt?: string;
  };
  
}

export interface AuthResponse {
  data: AuthRegisterValues;
}
