// Actions for default bingo game

export const markItem = (row, col) => ({
  type: "MARK_ITEM",
  payload: { row, col },
});

export const setGameSettings = (settings) => ({
  type: "SET_GAME_SETTINGS",
  payload: settings,
});

export const resetBingo = () => ({
  type: "RESET_BINGO",
});

//actions for the cutstom bingo cards
export const markCustomItem = (row, col) => ({
  type: "MARK_CUSTOM_ITEM",
  payload: { row, col },
});

export const setCustomGame = (gridSize, card, title) => ({
  type: "SET_CUSTOM_GAME",
  payload: { gridSize, card, title },
});

export const resetCustomBingo = () => ({
  type: "RESET_CUSTOM_BINGO",
});
