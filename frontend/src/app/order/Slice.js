import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { http } from '../../api/api';

const initialState = {
  order: {},
  orders: [],
  orderDetail: {},
  loading: false,
  error: false,
  success: false,
  message: '',
};

export const createOrder = createAsyncThunk(
  'order/create',
  async (order, { rejectWithValue, getState }) => {
    const token = getState().auth.user.data.token;
    console.log(token);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(`${http}/api/order`, order, config);
      return data;
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

export const getOrder = createAsyncThunk(
  'order/get',
  async (id, { rejectWithValue, getState }) => {
    const token = getState().auth.user.data.token;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(`${http}/api/order/${id}`, config);
      console.log(data);
      return data;
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
export const payOrder = createAsyncThunk(
  'order/update',
  async ({ id, paymentResult }, { rejectWithValue, getState }) => {
    const token = getState().auth.user.data.token;
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${http}/api/order/${id}/pay`,
        paymentResult,
        config
      );
      console.log(data);
      return data;
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

export const getUserOrder = createAsyncThunk(
  'user/order',
  async (_, { rejectWithValue, getState }) => {
    const { token } = getState().auth.user;
    console.log(token);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(`${http}/api/order/get`, config);
      console.log(data);
      return data;
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

const orderSlice = createSlice({
  name: 'cart',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(createOrder.pending, (state, action) => {
        state.loading = false;
        state.cartShip = action.payload;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = true;
        state.order = action.payload;
        state.success = true;
        console.log(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
        console.log(action.payload);
      })
      .addCase(getOrder.pending, (state, action) => {
        state.loading = true;
        state.cartShip = action.payload;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetail = action.payload;
        console.log(action.payload);
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
        console.log(action.payload);
      })
      .addCase(payOrder.pending, (state, action) => {
        state.loading = true;
        state.cartShip = action.payload;
      })
      .addCase(payOrder.fulfilled, (state, action) => {
        state.loading = false;
        // state.orderUpdare = action.payload;
        state.success = true;
        console.log(action.payload);
      })
      .addCase(payOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
        console.log(action.payload);
      })
      .addCase(getUserOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.orders = action.payload;
      })
      .addCase(getUserOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
        console.log(action.payload);
      });
  },
});

export default orderSlice.reducer;
