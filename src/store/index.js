import rootReducer from "../reducers";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: rootReducer,
});

console.log(store.getState());

export default store;
