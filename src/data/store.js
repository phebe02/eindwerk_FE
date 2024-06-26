import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import bingoApi from "./ApiSlice";
import bingoReducer from "../reducers/bingoReducer";
import customBingoReducer from "../reducers/customBingoReducer";

const store = configureStore({
  reducer: {
    [bingoApi.reducerPath]: bingoApi.reducer,
    bingo: bingoReducer,
    customBingo: customBingoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bingoApi.middleware),
});

setupListeners(store.dispatch);

export default store;
