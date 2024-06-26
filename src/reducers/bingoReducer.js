import { createSlice } from "@reduxjs/toolkit";
import bingoApi from "../data/ApiSlice"; // Verwijs naar de juiste locatie van ApiSlice

const initialState = {
  card: [],
  marked: [],
  bingo: false,
  themeId: null,
  gridSize: 4,
  completedBingos: [],
  words: [],
};

export const createCard = (size, words) => {
  const totalItemsNeeded = size * size;
  const shuffledWords = [...words].sort(() => 0.5 - Math.random()); // Maak een kopie van de array voordat je sorteert
  const cardItems = shuffledWords
    .slice(0, totalItemsNeeded)
    .map((wordObj) => wordObj.woord);

  let card = [];
  for (let i = 0; i < size; i++) {
    card.push(cardItems.slice(i * size, (i + 1) * size));
  }
  return card;
};

const checkBingo = (marked, completedBingos) => {
  const size = marked.length;
  let newBingo = false;
  let updatedBingos = [...completedBingos];

  // Check rows for bingo
  for (let row = 0; row < size; row++) {
    if (
      !updatedBingos.includes(`row${row}`) &&
      marked[row].every((cell) => cell)
    ) {
      updatedBingos.push(`row${row}`);
      newBingo = true;
    }
  }

  // Check columns for bingo
  for (let col = 0; col < size; col++) {
    if (!updatedBingos.includes(`col${col}`)) {
      let column = marked.map((row) => row[col]);
      if (column.every((cell) => cell)) {
        updatedBingos.push(`col${col}`);
        newBingo = true;
      }
    }
  }

  // Check diagonals for bingo
  if (
    !updatedBingos.includes("diagMain") &&
    marked.every((row, idx) => row[idx])
  ) {
    updatedBingos.push("diagMain");
    newBingo = true;
  }
  if (
    !updatedBingos.includes("diagAnti") &&
    marked.every((row, idx) => row[size - idx - 1])
  ) {
    updatedBingos.push("diagAnti");
    newBingo = true;
  }

  return { newBingo, updatedBingos };
};

const bingoSlice = createSlice({
  name: "bingo",
  initialState,
  reducers: {
    setGameSettings(state, action) {
      const { themeId, gridSize } = action.payload;
      state.themeId = themeId;
      state.gridSize = gridSize;
      state.bingo = false;
      state.completedBingos = [];
      state.marked = Array(gridSize)
        .fill()
        .map(() => Array(gridSize).fill(false));
    },
    markItem(state, action) {
      const { row, col } = action.payload;
      state.marked[row][col] = !state.marked[row][col];
      const { newBingo, updatedBingos } = checkBingo(
        state.marked,
        state.completedBingos
      );
      state.bingo = newBingo;
      state.completedBingos = updatedBingos;
    },
    resetBingo(state) {
      state.bingo = false;
    },
    loadSavedState(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    setCard(state, action) {
      state.card = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      bingoApi.endpoints.getThemeWords.matchFulfilled,
      (state, action) => {
        const words = action.payload;
        state.words = words;
        state.card = createCard(state.gridSize, words);
      }
    );
  },
});

export const {
  setGameSettings,
  markItem,
  resetBingo,
  loadSavedState,
  setCard,
} = bingoSlice.actions;
export default bingoSlice.reducer;
