import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import { type AuthState } from '@/types';
import authApiService from '@/services/authApiService';

interface AuthAction {
  type: 'LOGIN_START' | 'LOGIN_SUCCESS' | 'LOGIN_ERROR' | 'LOGOUT' | 'REGISTER_START' | 'REGISTER_SUCCESS' | 'REGISTER_ERROR' | 'UPDATE_USER' | 'INIT_FROM_STORAGE';
  payload?: any;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

const STORAGE_KEY = 'auth_state';

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
    case 'REGISTER_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'LOGIN_ERROR':
    case 'REGISTER_ERROR':
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case 'INIT_FROM_STORAGE':
      return {
        ...state,
        user: action.payload?.user || null,
        isAuthenticated: !!action.payload?.user,
        isLoading: false,
        error: null,
      };
    default:
      return state;
  }
};

interface AuthContextType extends AuthState {
  login: (identifier: string, password: string) => Promise<any>;
  register: (name: string, username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  dispatch: React.Dispatch<AuthAction>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize from localStorage on mount
  useEffect(() => {
    try {
      const storedAuth = localStorage.getItem(STORAGE_KEY);
      if (storedAuth) {
        const authData = JSON.parse(storedAuth);
        dispatch({ type: 'INIT_FROM_STORAGE', payload: authData });
      } else {
        dispatch({ type: 'INIT_FROM_STORAGE', payload: null });
      }
    } catch (error) {
      dispatch({ type: 'INIT_FROM_STORAGE', payload: null });
    }
  }, []);

  // Persist auth state to localStorage whenever it changes but skip while initializing to prevent clearing localStorage prematurely
  useEffect(() => {
    if (state.isLoading) {
      return;
    }

    if (state.isAuthenticated && state.user) {
      const dataToStore = { user: state.user };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToStore));
    } else if (!state.isAuthenticated) {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [state.isAuthenticated, state.user, state.isLoading]);

  const login = async (identifier: string, password: string) => {
    // TODO: Implement real login logic
    dispatch({ type: 'LOGIN_START' });
    // try {
    //   const { user } = await authApiService.login(identifier, password);
    //   dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    //   return user;
    // } catch (error) {
    //   dispatch({ type: 'LOGIN_ERROR', payload: (error as Error).message });
    //   throw error;
    // }

    await new Promise((resolve) => {
      console.log({ identifier, password });
      setTimeout(resolve, 500)
    });

    // dispatch({ type: 'LOGIN_ERROR', payload: 'Login error' });
    // return { message: 'Login error' };

    dispatch({
      type: 'LOGIN_SUCCESS', payload: {
        name: 'Nam',
        roles: ['admin'],
        avatar: '',
        createdAt: new Date(),
      }
    });
    return {
      user: {
        name: 'Nam',
        roles: ['admin'],
        avatar: '',
        createdAt: new Date(),
      }
    }
  };

  const register = async (name: string, username: string, email: string, password: string) => {
    dispatch({ type: 'REGISTER_START' });
    try {
      const { user } = await authApiService.register(name, username, email, password);
      dispatch({ type: 'REGISTER_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ type: 'REGISTER_ERROR', payload: (error as Error).message });
      throw error;
    }
  };

  const logout = () => {
    authApiService.logout().catch(console.error);
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
