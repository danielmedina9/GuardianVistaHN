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
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const authContext = createContext();
const storage = getStorage();

export const useAuth = () => {
  const context = useContext(authContext)
  if (!context) throw new Error('There is no Auth provider')
  return context
}

export async function uploadImg(file, currentUser, setLoading) {
  const fileRef = ref(storage, currentUser.uid + '.png');

  setLoading(true);
  
  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);

  updateProfile(currentUser, {photoURL});
  
  setLoading(false);
  alert("Uploaded file!");
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
