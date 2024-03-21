import { createContext, useContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth'
import { auth } from '../firebase-config'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

const authContext = createContext();
const storage = getStorage();

export const useAuth = () => {
  const context = useContext(authContext)
  if (!context) throw new Error('There is no Auth provider')
  return context
}

export async function uploadImg(file, currentUser, setLoading) {
  if (currentUser?.user?.uid) {
    const fileRef = ref(storage, currentUser.user.uid + '/' + file.name);

    setLoading(true);

    const snapshot = await uploadBytesResumable(fileRef, file);
    console.log("snapshot ===", snapshot)
    const photoURL = await getDownloadURL(fileRef);

    updateProfile(currentUser?.user, { photoURL });
    setLoading(false);
    alert("Uploaded file!");

    return photoURL;
  } else {
    return '';
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider()
    return signInWithPopup(auth, googleProvider)
  }

  const logout = () => signOut(auth)

  const resetPassword = async email => sendPasswordResetEmail(auth, email)



  useEffect(() => {
    const unsubuscribe = onAuthStateChanged(auth, currentUser => {
      console.log("currentUser ===", currentUser)
      setUser(currentUser)
      setLoading(false)
    })
    return () => unsubuscribe()
  }, [])


  return (
    <authContext.Provider
      value={{
        signup,
        login,
        user,
        logout,
        loading,
        loginWithGoogle,
        resetPassword,
        uploadImg,
      }}
    >
      {children}
    </authContext.Provider>
  )
}