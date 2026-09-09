export interface User {
  name: string;
  email: string;
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
  accessToken: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
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
  data: User;
}
