import { useEffect } from "react";
import Login from "./components/Login";
import Topics from "./components/Topics";
import { useAuthStore } from "./store/appStore";
import { useStoreCurrentUser } from "./store/hooks/useStoreCurrentUser";

function App() {
  const login = useAuthStore((state) => state.login);
  const currentUser =useStoreCurrentUser();

  useEffect(() => {
    login("1", "test@example.com", "Test User");
  }, [login]);

  return (
    <div className="flex flex-col w-full h-screen">
      {currentUser ? <Topics /> : <Login />}
    </div>
  );
}

export default App;
