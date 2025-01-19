import { onAuthStateChanged, User } from "firebase/auth";
import React from "react";
import { auth } from "./firebase";
import { login, logout } from "./api";

export default function useAuth() {
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  async function handleLogin(email: string, password: string) {
    try {
      await login(email, password);
    } catch (error) {
      console.error("Login error: ", error);
    }
  }

  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error: ", error);
    }
  }

  return { user, handleLogin, handleLogout };
}
