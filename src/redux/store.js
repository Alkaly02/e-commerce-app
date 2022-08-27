import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import commandeSlice from "./slices/commandeSlice";
import globalShopSlice from "./slices/globalShopSlice";
import globalCartSlice from "./slices/globalCartSlice";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
  cart: cartSlice,
  command: commandeSlice,
  globalShop: globalShopSlice,
  globalCart: globalCartSlice
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// const store = configureStore({
//     reducer: {
//         cart: cartSlice,
//         command: commandeSlice
//     }
// })

// export default store
