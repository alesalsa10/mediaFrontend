import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const axios = require('axios').default;

const initialState = {
  status: 'idle',
  errors: null,
  isAuth: false,
  user: null,
  accessToken: null,
  persist: JSON.parse(localStorage.getItem('persist')) || false,
};

const createAccount = async (data) => {
  const response = await axios.post(`http://localhost:3000/auth/register`, {
    name: data.name,
    username: data.username,
    email: data.email,
    password: data.password,
  });
  return response.data;
};

const login = async (data) => {
  const response = await axios.post(`http://localhost:3000/auth/signin`, {
    email: data.email,
    password: data.password,
  });
  console.log(response.data);
  return response.data;
};

const refresh = async () => {
  const response = await axios.get(`http://localhost:3000/auth/refresh`, {
    withCredentials: true,
  });
  console.log(response.data);
  return response.data;
};

export const register = createAsyncThunk(
  'auth/register',
  async (data, { rejectWithValue }) => {
    try {
      const response = await createAccount(data);
      return response;
    } catch (err) {
      console.log(err.response.data);
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
      console.log(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refresh',
  async (data, { rejectWithValue }) => {
    try {
      const response = await refresh();
      console.log(response.data);
      return response;
    } catch (err) {
      console.log(err.response.data);
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
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'idle';
        state.errors = action.payload;
        state.isAuth = false;
        state.user = null;
      })
      .addCase(signin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload.foundUser;
        state.accessToken = action.payload.accessToken;
        state.errors = null;
        state.isAuth = true;
      })
      .addCase(signin.rejected, (state, action) => {
        state.status = 'idle';
        state.errors = action.payload;
        state.isAuth = false;
        state.user = null;
      })
      // .addCase(refreshToken.pending, (state) => {
      //   //state.status = 'loading';
      // })
      .addCase(refreshToken.fulfilled, (state, action) => {
        //state.status = 'idle';
        state.accessToken = action.payload.accessToken;
        state.errors = null;
        state.isAuth = true;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        //state.status = 'idle';
        //state.errors = action.payload;
        state.isAuth = false;
        state.user = null;
        state.accessToken = null;
      });
  },
});

export const { togglePersist } = authSlice.actions;

export default authSlice.reducer;
