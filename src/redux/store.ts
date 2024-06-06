import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import IsAuthenticatedReducer from "./reducers/IsAuthenticatedReducer";
import OrderReducer from "./reducers/OrderReducer";
import UserReducer from "./reducers/UserReducer";
import WorkersReducer from "./reducers/WorkersReducer";
import reduxPersistMiddleware from "./reduxPersistMiddleware";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "order", "isAuthenticated"],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    user: UserReducer,
    workers: WorkersReducer,
    isAuthenticated: IsAuthenticatedReducer,
    order: OrderReducer,
  })
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(reduxPersistMiddleware),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
