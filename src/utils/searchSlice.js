import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    suggestionCache: {},
  },
  reducers: {
    cacheResults: (state, action) => {
      state.suggestionCache = Object.assign(
        state.suggestionCache,
        action.payload
      );
    },
  },
});
export const { cacheResults } = searchSlice.actions;
export default searchSlice.reducer;
