/**
 * @author Tran Van Cuong
 */
import { useState } from "react";
import LoginPage from "./components/LoginPage";
import AdminLayout from "./components/AdminLayout";
import { getSession, logout } from "./services/authService";

// App decides which top-level view to show based on the auth state.
export default function App() {
  const [user, setUser] = useState(() => getSession());

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  if (!user) {
    return <LoginPage onLogin={setUser} />;
  }
  return <AdminLayout user={user} onLogout={handleLogout} />;
}
