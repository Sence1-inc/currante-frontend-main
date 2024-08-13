import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import encryptedStorage from "../utils/encryptedStorage";
import IsAuthenticatedReducer from "./reducers/IsAuthenticatedReducer";
import IsLoadingReducer from "./reducers/IsLoadingReducer";
import OrderReducer from "./reducers/OrderReducer";
import ParticipantDataReducer from "./reducers/ParticipantDataReducer";
import ParticipantReducer from "./reducers/ParticipantReducer";
import UserReducer from "./reducers/UserReducer";
import WorkersReducer from "./reducers/WorkersReducer";

const persistConfig = {
  key: "root",
  storage: encryptedStorage,
  whitelist: ["user", "order", "isAuthenticated", "participant"],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    user: UserReducer,
    workers: WorkersReducer,
    participant: ParticipantReducer,
    participantData: ParticipantDataReducer,
    isAuthenticated: IsAuthenticatedReducer,
    isLoading: IsLoadingReducer,
    order: OrderReducer,
  })
);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
