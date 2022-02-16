import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const axios = require('axios').default;

const initialState = {
  status: 'idle',
  errors: null,
  isAuth: false,
  token: '',
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

const login = async(data)=>{
  const response = await axios.post(`http://localhost:3000/auth/register`, {
    email: data.email,
    password: data.password
  });
  return response.data
}

export const register = createAsyncThunk(
  'auth/register',
  async (data, { rejectWithValue }) => {
    try {
      const response = await createAccount(data);
      return response.data;
    } catch (err) {
        console.log(err.response.data)
        return rejectWithValue(err.response.data);
    }
  }
);

export const signin = createAsyncThunk(
  'auth/signin',
  async (data, { rejectWithValue }) => {
    try {
      const response = await login(data);
      return response.data;
    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value += action.payload;
        state.errors = null;
        state.isAuth = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'idle';
        state.errors = action.payload;
        state.isAuth = false;
        state.token = null;
      })
      .addCase(signin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value += action.payload;
        state.errors = null;
        state.isAuth = true;
      })
      .addCase(signin.rejected, (state, action) => {
        state.status = 'idle';
        state.errors = action.payload;
        state.isAuth = false;
        state.token = null;
      });
  },
});

export default authSlice.reducer;
