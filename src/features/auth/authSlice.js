import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';
import api from '../../services/api';
const baseURL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_BASE
    : process.env.REACT_APP_LOCAL_BASE;

const initialState = {
  status: 'idle',
  errors: null,
  isAuth: !!localStorage.getItem('accessToken') || false,
  user: null,
  accessToken: localStorage.getItem('accessToken') || null,
  persist: JSON.parse(localStorage.getItem('persist')) || false,
  isAfterPasswordChange: false,
};

const createAccount = async (data) => {
  const response = await axios.post(
    `${baseURL}auth/register`,
    {
      name: data.name,
      username: data.username,
      email: data.email,
      password: data.password,
    },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const login = async (data) => {
  const response = await axios.post(
    `${baseURL}auth/signin`,
    {
      email: data.email,
      password: data.password,
    },
    {
      withCredentials: true,
    }
  );
  //console.log(response.data);
  return response.data;
};

const refresh = async () => {
  const response = await axios.get(`${baseURL}auth/refresh`, {
    withCredentials: true,
  });
  //console.log(response.data);
  return response.data;
};

const logout = async () => {
  const response = await axios.get(`${baseURL}auth/signout`, {
    withCredentials: true,
  });
  return response.data;
};

const self = async () => {
  const response = await api.get(`users/self`, {
    headers: {
      Authorization: `Token ${initialState.accessToken}`,
    },
  });
  //console.log(response.data);
  return response.data;
};

export const register = createAsyncThunk(
  'auth/register',
  async (data, { rejectWithValue }) => {
    try {
      const response = await createAccount(data);
      return response;
    } catch (err) {
      //console.log(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

export const signin = createAsyncThunk(
  'auth/signin',
  async (data, { rejectWithValue }) => {
    try {
      const response = await login(data);
      return response;
    } catch (err) {
      //console.log(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refresh',
  async (data, { rejectWithValue }) => {
    try {
      const response = await refresh();
      //console.log(response);
      return response;
    } catch (err) {
      //console.log(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

export const signout = createAsyncThunk(
  'auth/signout',
  async (isAfter, { rejectWithValue, dispatch}) => {
    //initialState.isAfterPasswordChange = isAfter ? true : false;
    //state.auth.isAfterPasswordChange = isAfter? true: false;
    if(isAfter){
      dispatch(toggleIsAfterPass())
    }
    try {
      const response = await logout();
      return response;
    } catch (err) {
      //console.log(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

export const getSelf = createAsyncThunk(
  'auth/getSelf',
  async (data, { rejectWithValue }) => {
    try {
      const response = await self();
      //console.log(response);
      return response;
    } catch (err) {
      //console.log(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    togglePersist: (state) => {
      state.persist = !state.persist;
      localStorage.setItem('persist', state.persist);
    },
    toggleIsAfterPass: (state) =>{
      state.isAfterPasswordChange = !state.isAfterPasswordChange
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'idle';
        state.errors = null;
        state.isAuth = true;
        state.user = action.payload.foundUser;
        state.isAfterPasswordChange = false;
        state.isVerified = false;
        if (state.persist) {
          localStorage.setItem('accessToken', action.payload.accessToken);
          state.accessToken = action.payload.accessToken;
        } else {
          state.accessToken = action.payload.accessToken;
        }
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'idle';
        state.errors = action.payload;
        state.isAuth = false;
        state.user = null;
        state.isAfterPasswordChange = false;
      })
      .addCase(signin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload.foundUser;
        state.errors = null;
        state.isAuth = true;
        state.isVerified = action.payload.foundUser.isVerified;
        state.isAfterPasswordChange = false;
        if (state.persist) {
          localStorage.setItem('accessToken', action.payload.accessToken);
          state.accessToken = action.payload.accessToken;
        } else {
          state.accessToken = action.payload.accessToken;
        }
      })
      .addCase(signin.rejected, (state, action) => {
        state.status = 'idle';
        state.errors = action.payload;
        state.isAuth = false;
        state.user = null;
        state.isAfterPasswordChange = false;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        //state.status = 'idle';
        //state.accessToken = action.payload;
        state.errors = null;
        state.isAuth = true;
        state.isAfterPasswordChange = false;

        if (state.persist) {
          localStorage.setItem('accessToken', action.payload);
          state.accessToken = action.payload;
        } else {
          state.accessToken = action.payload;
        }
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.status = 'idle';
        state.isAfterPasswordChange = false;
        state.isAuth = false;
        state.user = null;
        state.accessToken = null;
      })
      .addCase(signout.fulfilled, (state, action) => {
        state.status = 'idle';
        state.errors = null;
        state.isAuth = false;
        localStorage.removeItem('accessToken');
        state.accessToken = null;
        console.log(action.payload);
      })
      .addCase(signout.rejected, (state, action) => {
        state.status = 'idle';
        state.isAuth = false;
        state.user = null;
        localStorage.removeItem('accessToken');
        state.accessToken = null;
      })
      .addCase(getSelf.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuth = true;
        state.isAfterPasswordChange = false;
      })
      .addCase(getSelf.rejected, (state, action) => {
        state.user = null;
        state.isAuth = false;
        state.isAfterPasswordChange = false;
      });
  },
});

export const { togglePersist, toggleIsAfterPass} = authSlice.actions;

export default authSlice.reducer;
