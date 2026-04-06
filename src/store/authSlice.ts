import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { authService } from '../services/auth.service'
import { setCookie, getCookie, removeCookie } from '../utils/cookieHelper'
const COOKIE_NAME = import.meta.env.VITE_COOKIE_NAME || 'token';

export interface User {
  id?: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  token: getCookie(COOKIE_NAME) || null,
  isAuthenticated: !!getCookie(COOKIE_NAME),
  loading: false,
  error: null,
}

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: any, { rejectWithValue }) => {
    try {
      const responseBody = await authService.login(credentials);
      const { data: user, token } = responseBody;
      
      // Set token on cookie (7 days)
      setCookie(COOKIE_NAME, token, 7);
      
      localStorage.setItem('user', JSON.stringify({
        id: user._id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        avatar: user.avatar
      }));
      return { user, token };
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: any, { rejectWithValue }) => {
    try {
      return await authService.register(userData);
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
      state.isAuthenticated = !!action.payload
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      removeCookie(COOKIE_NAME)
      localStorage.removeItem('user')
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        const { user } = action.payload;
        state.user = {
          id: user._id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          avatar: user.avatar
        };
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = (typeof action.payload === 'string' ? action.payload : (action.payload as any)?.message) || 'Login failed';
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = (typeof action.payload === 'string' ? action.payload : (action.payload as any)?.message) || 'Registration failed';
      });
  },
})

export const { setUser, logout, clearError } = authSlice.actions

export default authSlice.reducer
