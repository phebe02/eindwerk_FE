const initialState = {
  card: [],
  marked: [],
  bingo: false,
  theme: "default",
  gridSize: 4,
  completedBingos: [],
};

const createCard = (size) => {
  const items = [
    "yellow car",
    "gas station",
    "police car",
    "restaurant",
    "hotel",
    "tree",
    "road sign",
    "bridge",
    "motorcycle",
    "traffic light",
    "bicycle",
    "plane",
    "boat",
    "cow",
    "dog",
    "billboard",
    "river",
    "park",
    "playground",
    "bus stop",
    "post office",
    "library",
    "museum",
    "bank",
    "church",
    "school",
    "shopping mall",
    "stadium",
    "cinema",
    "theater",
    "hospital",
    "fire station",
    "court house",
    "pharmacy",
    "bakery",
    "restaurant",
  ];

  const totalItemsNeeded = size * size;

  const shuffledItems = items.sort(() => 0.5 - Math.random());

  const cardItems = shuffledItems.slice(0, totalItemsNeeded);

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

const bingoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_GAME_SETTINGS":
      const { theme, gridSize } = action.payload;
      return {
        ...state,
        theme,
        gridSize,
        card: createCard(gridSize),
        marked: Array(gridSize)
          .fill()
          .map(() => Array(gridSize).fill(false)), // Properly reset marked array
        bingo: false,
        completedBingos: [],
      };
    case "MARK_ITEM":
      const { row, col } = action.payload;
      const newMarked = state.marked.map((r, i) =>
        r.map((c, j) => (i === row && j === col ? !c : c))
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
    case "RESET_BINGO":
      return {
        ...state,
        bingo: false,
      };

    case "LOAD_SAVED_STATE":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default bingoReducer;
