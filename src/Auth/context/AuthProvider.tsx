import { AuthContext } from "./AuthContext";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  User,
  UserCredential,
  signInWithEmailAndPassword,
  signOut,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";
import { firebaseApp } from "../credentials";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const auth = getAuth(firebaseApp);
export const useAuth = () => {
  return useContext(AuthContext);
};

const googleProvider = new GoogleAuthProvider();

export const AuthProvider: React.FC = ({ children }) => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const signUp = (email: string, password: string): Promise<UserCredential> => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email: string, password: string): Promise<UserCredential> => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = (): Promise<never> => {
    return signInWithRedirect(auth, googleProvider);
  };

  const onSignOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, userData => {
      if (userData) {
        setCurrentUser(userData);
      } else {
        setCurrentUser(null);
      }
    });

    return unSubscribe;
  }, []);

  const value = {
    signUp,
    signIn,
    signInWithGoogle,
    onSignOut,
    currentUser,
    firebaseApp
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
