import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import api from "./ApiSlice";
import bingoReducer from "../reducers/bingoReducer";
import customBingoReducer from "../reducers/customBingoReducer";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    bingo: bingoReducer,
    customBingo: customBingoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

export default store;
