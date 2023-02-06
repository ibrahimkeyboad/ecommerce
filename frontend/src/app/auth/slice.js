import axios from 'axios';
import { http } from '../../api/api';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const user = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null;

const initialState = {
  user,
  users: [],
  userDetail: {},
  loading: false,
  error: false,
  succes: false,
  message: '',
};

// export const register = createAsyncThunk(
//   'aut/register',
//   async (userData, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.post(`${http}/api/user/register`, userData);
//       if (data) {
//         localStorage.setItem('user', JSON.stringify(data));
//       }
//       return data;
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return rejectWithValue(message);
//     }
//   }
// );
export const login = createAsyncThunk(
  'aut/login',
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${http}/api/user/login`, userData);
      if (data) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      return data.user;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  'aut/path',
  async (userData, { rejectWithValue, getState }) => {
    const { token } = getState().auth.user;
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${http}/api/user/profile`,
        userData,
        config
      );
      if (data) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      return data.user;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

export const getUsers = createAsyncThunk(
  'ath/gets',
  async (_, { getState, rejectWithValue }) => {
    console.log('hello');
    const { token } = getState().auth.user;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(`${http}/api/user`, config);
      return data.users;
    } catch (error) {
      console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'user/delet',
  async (id, { getState, rejectWithValue }) => {
    const { token } = getState().auth.user;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.delete(`${http}/api/user/${id}`, config);
      return data.users;
    } catch (error) {
      console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

export const getUserById = createAsyncThunk(
  'user/id',
  async (id, { rejectWithValue, getState }) => {
    const { token } = getState().auth.user;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(`${http}/api/user/${id}`, config);
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(rejectWithValue(message));
      return rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser(state) {
      state.user = null;
      localStorage.removeItem('user');
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.succes = true;
        state.user = action.payload;
        // console.log(action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.succes = true;
        state.user = action.payload.data;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        console.log(action.payload);
        state.message = action.payload;
      })
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.succes = true;
        state.users = action.payload;
        console.log(action.payload);
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
        console.log(action.payload);
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.succesDelete = true;
        console.log(action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
        console.log(action.payload);
      })
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetail = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
        console.log(action.payload);
      });
  },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
