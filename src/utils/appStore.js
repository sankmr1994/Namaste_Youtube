import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./navSlice";
import searchReducer from "./searchSlice";
import videoReducer from "./videoSlice";
import chatReducer from "./chatSlice";

const appStore = configureStore({
  reducer: {
    nav: navReducer,
    search: searchReducer,
    video: videoReducer,
    chat: chatReducer,
  },
});

export default appStore;
