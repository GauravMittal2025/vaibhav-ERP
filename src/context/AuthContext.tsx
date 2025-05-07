import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { AuthContextType, AuthState, LoginCredentials, RegisterCredentials } from '../types/auth';
import { authService } from '../services/authService';

// Initial authentication state
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

// Auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth reducer
type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: { user: AuthState['user']; token: string } }
  | { type: 'AUTH_FAILURE'; payload: string }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'CLEAR_ERROR' };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  console.log('authreducer----', state)
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'AUTH_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case 'AUTH_LOGOUT':
      return {
        ...initialState,
        isLoading: false,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [auth, dispatch] = useReducer(authReducer, initialState);

  // Check for existing authentication on mount
  useEffect(() => {
    const initializeAuth = async () => {
      const isAuth = authService.isAuthenticated();
      if (isAuth) {
        const user = authService.getCurrentUser();
        const token = localStorage.getItem('auth_token') || '';
        
        if (user) {
          dispatch({
            type: 'AUTH_SUCCESS',
            payload: { user, token },
          });
        } else {
          // Invalid state - token exists but no user
          authService.logout();
          dispatch({ type: 'AUTH_LOGOUT' });
        }
      } else {
        dispatch({ type: 'AUTH_LOGOUT' });
      }
    };

    initializeAuth();
  }, []);

  // Login handler
  const login = async (credentials: LoginCredentials) => {
    try {
      dispatch({ type: 'AUTH_START' });
      const { user, token } = await authService.login(credentials);
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: { user, token },
      });
    } catch (error) {
      dispatch({
        type: 'AUTH_FAILURE',
        payload: error instanceof Error ? error.message : 'An error occurred during login',
      });
      throw error;
    }
  };

  // Register handler
  const register = async (credentials: RegisterCredentials) => {
    try {
      dispatch({ type: 'AUTH_START' });
      const { user, token } = await authService.register(credentials);
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: { user, token },
      });
    } catch (error) {
      dispatch({
        type: 'AUTH_FAILURE',
        payload: error instanceof Error ? error.message : 'An error occurred during registration',
      });
      throw error;
    }
  };

  // Logout handler
  const logout = () => {
    authService.logout();
    dispatch({ type: 'AUTH_LOGOUT' });
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value = {
    auth,
    login,
    register,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};