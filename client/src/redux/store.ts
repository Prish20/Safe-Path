// store.ts
import { configureStore, combineReducers, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from "../user/userSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import incidentReducer from './slices/incidentSlice';
import incidentDetailsReducer from "./slices/incidentDetailsSlice";

const rootReducer = combineReducers({
  user: userReducer,
  incidents: incidentReducer,
  incidentDetails: incidentDetailsReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
