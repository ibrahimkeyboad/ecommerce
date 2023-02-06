import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { http } from '../../api/api';

const cartItem = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : [];

const cartShip = localStorage.getItem('shipp')
  ? JSON.parse(localStorage.getItem('shipp'))
  : {};
const cartPayment = localStorage.getItem('cartpay')
  ? JSON.parse(localStorage.getItem('cartpay'))
  : {};

const initialState = {
  cartItems: cartItem,
  cartShip,
  cartPayment,
  loading: false,
  message: '',
};

export const addToCart = createAsyncThunk(
  'add/cart',
  async ({ id, qty }, { rejectWithValue, getState }) => {
    console.log(id);
    try {
      const { data } = await axios.get(`${http}/api/products/${id}`);
      const product = {
        product: data.product._id,
        name: data.product.name,
        image: data.product.image,
        price: data.product.price,
        countInStock: data.product.countInStock,
        qty,
      };
      console.log(getState().cart);
      localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems));
      console.log('product', product);
      return product;
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

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    savePayment(state, action) {
      state.cartPayment = action.payload;
      localStorage.setItem('cartpay', JSON.stringify(action.payload));
      console.log(action.payload);
    },
    shippingAddress(state, action) {
      const address = action.payload;
      localStorage.setItem('shipp', JSON.stringify(address));
      state.cartShip = address;
      console.log(address);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addToCart.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        const item = action.payload;
        const existItem = state.cartItems.find(
          (x) => x.product === item.product
        );
        if (existItem) {
          state.cartItems.map((x) => {
            console.log(x.product, existItem.product);
            console.log('item', item);
            return x.product === existItem.product ? (x.qty = item.qty) : x;
          });
        } else {
          state.cartItems = [...state.cartItems, item];
        }
        console.log('state', state.cartItems);
        // localStorage.setItem('cart', JSON.stringify(state.cartItems));
      });
  },
});

export const { savePayment, shippingAddress } = cartSlice.actions;

export default cartSlice.reducer;
