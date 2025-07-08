"use client"
import { createContext, useContext, useEffect, useState } from "react"
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { app } from "@/firebase/firebase.config";
import axios from "axios";

const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    };

    const SingIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    };

    const singUpGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    };

    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    };

    const passwordReset = (email) => {
        return sendPasswordResetEmail(auth, email)
    };

    const authInfo = {
        user,
        loading,
        createUser,
        SingIn,
        singUpGoogle,
        passwordReset,
        logOut
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            if (currentUser) {
                axios.post('http://localhost:5000/api/jwt', { email: currentUser?.email })
                    // axios.post('https://doctor-house-server-zeta.vercel.app/api/jwt', { email: currentUser?.email })
                    .then((data) => {
                        localStorage.setItem("access-token", data.data.token)
                        console.log(data.data)
                        setLoading(false)
                    })
                    .catch((error) => {
                        console.error("JWT API error:", error);
                        setLoading(false);
                    });
            }
            else {
                localStorage.removeItem("access-token")
            }
            setLoading(false)
        })
        return () => {
            unsubscribe()
        }
    }, []);


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext) 
