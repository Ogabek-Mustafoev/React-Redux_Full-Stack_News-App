import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import useHttp from '../../hooks/useHttp';

const newsAdapter = createEntityAdapter();

const initialState = newsAdapter.getInitialState({
  newsLoadingStatus: "bek",
});

export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async () => {
    const { request } = useHttp();
    return await request("http://localhost:3001/news");
  }
)

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    newsCreated: (state, { payload }) => { newsAdapter.addOne(state, payload) },
    newsDeleted: (state, { payload }) => { newsAdapter.removeOne(state, payload) }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchNews.pending, (state) => { state.newsLoadingStatus = "loading" })
      .addCase(fetchNews.fulfilled, (state, { payload }) => {
        state.newsLoadingStatus = 'bek';
        newsAdapter.setAll(state, payload)
      })
      .addCase(fetchNews.rejected, (state) => { state.newsLoadingStatus = 'error' })
      .addDefaultCase(() => { })
  }
});

const { actions, reducer } = newsSlice;
const { selectAll } = newsAdapter.getSelectors(state => state.news);

export const filteredNewsSelected = createSelector(
  (state) => state.filter.activeFilter,
  selectAll,
  (filter, news) => {
    if (filter === "All") {
      return news;
    } else {
      return news.filter((item) => item.category === filter);
    }
  }
);
export default reducer;
export const { newsCreated, newsDeleted } = actions;