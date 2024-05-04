/* eslint-disable react/prop-types */
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../../FireBase/firebase.config";
import { GoogleAuthProvider } from "firebase/auth/cordova";

export const AuthContext = createContext(null)
 const auth = getAuth(app);


const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    // create new user with email and password
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    // sign in 
    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }
    // login with google 
    const googleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    // logout 
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }
    // updated user 
    const updatedUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    }
    //  current user orvjrb korar jonno 
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            console.log('currentUser Hoy ', currentUser);
            // nicer if else dui ta jwt token ar jonno 
            // if (currentUser) {
            //       const userInfo = { email: currentUser.email };
            //       axiosPublic.post('/jwt', userInfo)
            //             .then(res => {
            //                   if (res.data.token) {
            //                         localStorage.setItem('access-token', res.data.token);
            //                         setLoading(false)
            //                   }
            //             })
            // }
            // else {
            //       // toDo: remove token (if token stored in the client side: local Storage,caching,in emory )
            //       localStorage.removeItem('access-token')
            //       setLoading(false)
            // }
            setLoading(false)
        });
        return () => {
            return unsubscribe();
        }
    }, [])

    const authInfo = {
        user,
        loading,
        setLoading,
        createUser,
        signIn,
        logOut,
        updatedUserProfile,
        googleSignIn,
        setUser
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;