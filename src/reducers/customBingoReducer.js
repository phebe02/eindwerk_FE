const initialCustomState = {
  card: [],
  marked: [],
  bingo: false,
  title: "",
  gridSize: 4,
  completedBingos: [],
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

const customBingoReducer = (state = initialCustomState, action) => {
  switch (action.type) {
    case "SET_CUSTOM_GAME":
      const { gridSize, card, title } = action.payload;
      return {
        ...state,
        gridSize,
        card,
        title,
        marked: Array(gridSize)
          .fill()
          .map(() => Array(gridSize).fill(false)),
        bingo: false,
        completedBingos: [],
      };
    case "MARK_CUSTOM_ITEM":
      const { row, col } = action.payload;
      const newMarked = state.marked.map((r, i) =>
        r.map((c, j) => (i === row && j === col ? true : c))
      );
      const { newBingo, updatedBingos } = checkBingo(
        newMarked,
        state.completedBingos
      );
      return {
        ...state,
        marked: newMarked,
        bingo: newBingo,
        completedBingos: updatedBingos,
      };
    case "RESET_CUSTOM_BINGO":
      return {
        ...state,
        bingo: false,
      };
    default:
      return state;
  }
};

export default customBingoReducer;
