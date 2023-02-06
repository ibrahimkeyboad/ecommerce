import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { http } from '../../api/api';

const initialState = {
  product: {},
  products: [],
  loading: false,
  error: false,
  message: '',
};

export const getProducts = createAsyncThunk(
  'gets/prduct',
  async ({ keyword, pageNumber }, { rejectWithValue }) => {
    console.log(keyword, pageNumber);
    try {
      const { data } = await axios.get(
        `${http}/api/products?keyword=${keyword}&page=${pageNumber}`
      );
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
export const getProduct = createAsyncThunk(
  'get/product',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${http}/api/products/${id}`);
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

const productSlice = createSlice({
  name: 'product',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        console.log(action.payload);
        state.message = action.payload;
      })
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.product;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      });
  },
});

export default productSlice.reducer;
