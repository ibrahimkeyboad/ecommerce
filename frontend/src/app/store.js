import { configureStore } from '@reduxjs/toolkit';
import ProductReducer from './product/productSlice';
import cartReducer from './cart/cartSlice';
import authReducer from './auth/slice';
import orderReducer from './order/Slice';
import reviewReducer from './review/review';

const Store = configureStore({
  reducer: {
    ProductReducer,
    cart: cartReducer,
    auth: authReducer,
    orderReducer,
    reviewReducer,
  },
});

export default Store;
