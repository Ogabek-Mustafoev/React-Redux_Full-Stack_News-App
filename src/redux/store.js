import { configureStore } from '@reduxjs/toolkit'
import stringMiddleware from '../middleware/stringMiddleware';
import filter from "../components/NewsFilter/filter_slice";
import news from "../components/NewsList/news_slice";

const store = configureStore({
  reducer: { news, filter },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(stringMiddleware),
  devTools: process.env.NODE_ENV !== 'production'
})

export default store;
