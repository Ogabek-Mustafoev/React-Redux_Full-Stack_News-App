import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import useHttp from "../../hooks/useHttp";

const initialState = {
  filters: [],
  filterLoadingStatus: "bek",
  activeFilter: "All",
};

export const filtersFetching = createAsyncThunk(
  'filter/filtersFetching',
  async () => {
    const { request } = useHttp();
    return await request('http://localhost:3001/filter');
  }
)

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    activeFilterChanged: (state, { payload }) => { state.activeFilter = payload }
  },
  extraReducers: builder => {
    builder
      .addCase(filtersFetching.pending, (state) => { state.filterLoadingStatus = 'loading' })
      .addCase(filtersFetching.fulfilled, (state, { payload }) => {
        state.filters = payload;
        state.filterLoadingStatus = 'bek';
      })
      .addCase(filtersFetching.rejected, (state) => { state.filterLoadingStatus = 'error' })
      .addDefaultCase(() => { })
  }
});

const { actions, reducer } = filterSlice;

export default reducer;
export const { activeFilterChanged } = actions;