import store from "../redux/store";
import { RootState } from "../redux/store";

export function getEmail(): string | null {
  const state: RootState = store.getState();
  return state.user.email;
}
