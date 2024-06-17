// src/store.js
import { createStore } from "redux";
import rootReducer from "./reducers"; // Ensure you have an index file in your reducers directory

const store = createStore(rootReducer);

export default store;
