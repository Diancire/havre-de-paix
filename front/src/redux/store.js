import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import state from "./state";

// Configuration of redux-persist to persist Redux state between sessions
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// Using redux-persist with persisted reducer
const persistedReducer = persistReducer(persistConfig, state);

// Configuration of Redux store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Ignore certain actions when serializing Redux state
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Creation of persistor to persist Redux state between sessions
export let persistor = persistStore(store);