import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const resetPassword = email => {
    return sendPasswordResetEmail(auth, email);
  };

  const changePassword = newPassword => {
    return updatePassword(currentUser, newPassword);
  };

  const changeEmail = newEmail => {
    return updateEmail(currentUser, newEmail);
  };

  const changeDisplayName = newDisplayName => {
    return updateProfile(currentUser, { displayName: newDisplayName });
  };

  const changePhotoURL = async newPhoto => {
    const filePath = URL.createObjectURL(newPhoto);
    const storage = getStorage();
    const storageRef = ref(storage, `profile_icons/${newPhoto.name}`);
    const resp = await fetch(filePath);
    const blob = await resp.blob();
    await uploadBytes(storageRef, blob);
    const url = await getDownloadURL(
      ref(storage, `profile_icons/${newPhoto.name}`)
    );
    return updateProfile(currentUser, { photoURL: url });
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    return onAuthStateChanged(auth, user => {
      setCurrentUser(user);
    });
  }, []);

  const value = {
    changeEmail,
    changePassword,
    changePhotoURL,
    changeDisplayName,
    currentUser,
    signup,
    login,
    resetPassword,
    signout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
