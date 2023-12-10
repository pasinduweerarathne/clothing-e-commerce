import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import bazarReducer from "./bazarSlice";
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
import { PersistGate } from "redux-persist/integration/react";

const presistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(presistConfig, bazarReducer);

export const store = configureStore({
  reducer: { bazar: persistedReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
