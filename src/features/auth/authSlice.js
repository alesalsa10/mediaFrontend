import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const axios = require('axios').default;

const baseURL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_BASE
    : process.env.REACT_APP_LOCAL_BASE;

const initialState = {
  status: 'idle',
  errors: null,
  isAuth: false,
  user: null,
  accessToken: localStorage.get('accessToken') || null,
  persist: JSON.parse(localStorage.getItem('persist')) || false,
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
  console.log(response.data);
  return response.data;
};

const refresh = async () => {
  const response = await axios.get(`${baseURL}auth/refresh`, {
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
      //console.log(response);
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
        //state.accessToken = action.payload.accessToken;
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
      })
      // .addCase(refreshToken.pending, (state) => {
      //   //state.status = 'loading';
      // })
      .addCase(refreshToken.fulfilled, (state, action) => {
        //state.status = 'idle';
        //state.accessToken = action.payload;
        state.errors = null;
        state.isAuth = true;
        if (state.persist) {
          localStorage.setItem('accessToken', action.payload.accessToken);
          state.accessToken = action.payload.accessToken;
        } else {
          state.accessToken = action.payload.accessToken;
        }
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
