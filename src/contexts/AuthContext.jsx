import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import {
  getDatabase,
  set,
  ref as dRef,
  get,
  update,
  child,
} from "firebase/database";
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

  async function writeUserData(user) {
    try {
      const db = getDatabase();
      const userRef = dRef(db, `users/${user.uid}`);
      const userSnapshot = await get(userRef);
      if (!userSnapshot.exists()) {
        set(dRef(db, `users/${user.uid}`), {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function addSongToList(songID) {
    const db = getDatabase();
    const songListRef = dRef(db, `users/${currentUser.uid}/songs`);
    const userRef = dRef(db, `users/${currentUser.uid}`);
    const songListSnapShot = await get(songListRef);
    if (songListSnapShot.exists()) {
      let songs = songListSnapShot.val();
      songs.push(songID);
      update(userRef, {
        songs: songs,
      });
    } else {
      let songs = [songID];
      set(songListRef, songs);
    }
  }

  async function getUserSongList(user) {
    const dbRef = dRef(getDatabase());
    const songListRef = child(dbRef, `users/${user.uid}/songs`);
    const songListSnapShot = await get(songListRef);
    return songListSnapShot.val();
  }

  async function getUserByID(userID) {
    const dbRef = dRef(getDatabase());
    const userRef = child(dbRef, `users/${userID}`);
    const userSnapshot = await get(userRef);
    return userSnapshot.val();
  }

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signout = () => {
    return signOut(auth);
  };

  const deleteCurrentUser = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    deleteUser(user).catch(error => {
      console.log(error);
    });
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
    writeUserData,
    addSongToList,
    getUserSongList,
    getUserByID,
    deleteCurrentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
