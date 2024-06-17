// src/reducers/index.js
import { combineReducers } from "redux";
import bingoReducer from "./bingoReducer";
import customBingoReducer from "./customBingoReducer";

const rootReducer = combineReducers({
  bingo: bingoReducer,
  customBingo: customBingoReducer,
});

export default rootReducer;
