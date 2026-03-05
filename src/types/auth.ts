export const UserRole = {
  ADMIN: 'admin',
  USER: 'user',
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

export interface AuthAction {
  type: 'LOGIN_START' | 'LOGIN_SUCCESS' | 'LOGIN_ERROR' | 'LOGOUT' | 'REGISTER_START' | 'REGISTER_SUCCESS' | 'REGISTER_ERROR' | 'UPDATE_USER' | 'INIT_FROM_STORAGE';
  payload?: any;
}

export const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  roles: UserRole[];
  avatar?: string;
  createdAt: Date;
}
