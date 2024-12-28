import { useAuthStore } from "../appStore";

export const useStoreCurrentUser = () => {
  const currentUser = useAuthStore((state) => state.currentUser);
  return currentUser;
};
