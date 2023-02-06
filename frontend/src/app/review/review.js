import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { http } from '../../api/api';

const initialState = {
  reviews: [],
  loading: false,
  reviewSuccess: false,
  reviewError: false,
  message: '',
};

export const createReview = createAsyncThunk(
  'review/get',
  async ({ id, reviewData }, { rejectWithValue, getState }) => {
    console.log(reviewData);
    try {
      const { token } = getState().auth.user;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `${http}/api/products/${id}/review`,
        reviewData,
        config
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
export const getRviews = createAsyncThunk(
  'review/create',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth.user;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.post(`${http}/api/reviews`, config);
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

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(createReview.fulfilled, (state, action) => {
        state.reviewSuccess = true;
      })
      .addCase(createReview.rejected, (state, action) => {
        state.reviewError = true;
        state.message = action.payload;
      })
      .addCase(getRviews.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getRviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviewSuccess = true;
        state.reviews = action.payload;
      })
      .addCase(getRviews.rejected, (state, action) => {
        state.loading = false;
        state.reviewError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = reviewSlice.actions;

export default reviewSlice.reducer;
