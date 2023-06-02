import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Gig {
  title: string;
  desc: string;
  totalStars?: number;
  starNumber?: number;
  cat: string;
  price: string;
  cover: string;
  images?: string[];
  shortTitle: string;
  shortDesc: string;
  deliveryTime: number;
  revisionNumber: number;
  features?: string[];
  sales?: number;
  userId?: string;
  gigId: string;
}

export interface GigState {
  gigs: Gig[] | null;
  isFetching: boolean;
  error: boolean | string;
}

export interface Fetch {
  search: string;
  min: string | undefined;
  max: string | undefined;
  sort: string;
  userId?: string;
}

type FetchError = {
  message: string;
}

const BASE_URL = "http://localhost:1337/api";

export const fetchGigs = createAsyncThunk<Gig[], Fetch, { rejectValue: FetchError }>(
  'gigs/fetchGigs',
  async ({search, min, max, sort}: Fetch, thunkAPI) => {
    try {
      console.log(!min);
      console.log(!max);
      console.log(search == "");

      const response = await axios.get(`${BASE_URL}/gigs?${search}${search == "" ? "" : "&"}min=${!min ? "" : min}&max=${!max ? "" : max}&sort=${sort}`, { withCredentials: true });
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue({
        message: "Something went wrong :("
      });
    }
  }
);

const initialState: GigState = {
  gigs: [],
  isFetching: false,
  error: false,
}

export const gigSlice = createSlice({
  name: "gig",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    resetState: state => initialState,
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchGigs.pending, (state, action) => {
      state.isFetching = true;
    })
    builder.addCase(fetchGigs.fulfilled, (state, action: PayloadAction<Gig[]>) => {
      state.gigs = action.payload;
      state.isFetching = false;
      state.error = false;
    })
    builder.addCase(fetchGigs.rejected, (state, { payload }) => {
      state.isFetching = false;
      if (payload) state.error = payload.message;
    })
  },
});

export const { resetState } = gigSlice.actions;
export default gigSlice.reducer;