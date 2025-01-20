import { AuthErrorCodes, onAuthStateChanged, User } from "firebase/auth";
import React from "react";
import { auth } from "./firebase";
import { login, logout } from "./api";
import { FirebaseError } from "firebase/app";

export default function useAuth() {
  const [user, setUser] = React.useState<User | null>(null);
  const [authError, setAuthError] = React.useState("");

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  async function handleLogin(email: string, password: string) {
    setAuthError("");
    try {
      await login(email, password);
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (
          error.code === "auth/wrong-password" ||
          error.code === "auth/invalid-credential" ||
          error.code === "auth/invalid-email"
        ) {
          setAuthError("Niepoprawne dane logowania. Spróbuj ponownie.");
        }
      }
    }
  }

  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error: ", error);
    }
  }

  return { user, handleLogin, handleLogout, authError };
}
