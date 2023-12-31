import { configureStore, combineReducers } from "@reduxjs/toolkit";
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
import studentsSlice from "./Slice/studentsSlice";
import classesSlice from "./Slice/classesSlice";
import authSlice from "./user/authSlice";
import majorSlice from "./Slice/majorSlice";
import subjectsSlice from "./Slice/subjectsSlice";
import filtersSlice from "./Slice/filtersSlice";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const rootReducer = combineReducers({
  auth: authSlice.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    persistedReducer,
    students: studentsSlice.reducer,
    classes: classesSlice.reducer,
    majors: majorSlice.reducer,
    subjects: subjectsSlice.reducer,
    filters: filtersSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: true,
});
export let persistor = persistStore(store);
