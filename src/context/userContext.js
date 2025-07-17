import {createContext, useContext, useEffect, useState} from "react";
import {
    createUserWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail
} from 'firebase/auth'
import { doc, setDoc, collection, getDocs } from 'firebase/firestore';
import {auth, db} from "../firebase";
const UserContext = createContext({})
//Custom Hook useUserContext
export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState();
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true)
        const unsubscribe = onAuthStateChanged(auth, res => {
            res ? setUser(res) : setUser(null);
            setError("");
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    // Helper to map Firebase error codes to user-friendly messages
    const getFriendlyError = (error) => {
        if (!error || !error.code) return "An unknown error occurred.";
        switch (error.code) {
            case "auth/user-not-found":
                return "No user found with this email.";
            case "auth/wrong-password":
                return "Incorrect password. Please try again.";
            case "auth/invalid-email":
                return "Invalid email address.";
            case "auth/email-already-in-use":
                return "This email is already registered.";
            case "auth/weak-password":
                return "Password is too weak. Please use at least 6 characters.";
            default:
                return error.message || "An error occurred. Please try again.";
        }
    };

    const registerUser = (email, name, password) => {
        setLoading(true)
        console.log("registerUser: Starting registration for:", email, name);
        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            const user = userCredential.user;
            console.log("registerUser: User created:", user);
            updateProfile(user, {
                displayName : name,
            });
            // Save user data to Firestore
            console.log("registerUser: Saving to Firestore...");
            return setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                email: user.email,
                displayName: name,
                createdAt: new Date().toISOString()
            });
        }).then((res) => console.log("registerUser: User saved to Firestore successfully:", res))
        .catch(err => setError(getFriendlyError(err))).finally(() => setLoading(false));
    };

    const signInUser = (email, password) => {
        setLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((res) => console.log(res))
            .catch((err) => setError(getFriendlyError(err)))
            .finally(() => setLoading(false));
    };

    const logoutUser = () => {
       signOut(auth);
    };

    const forgotPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    };

    const getAllUsers = async () => {
        try {
            console.log("getAllUsers: Starting to fetch users from Firestore...");
            const querySnapshot = await getDocs(collection(db, "users"));
            console.log("getAllUsers: QuerySnapshot received:", querySnapshot);
            const users = [];
            querySnapshot.forEach((doc) => {
                console.log("getAllUsers: Processing doc:", doc.id, doc.data());
                users.push({ id: doc.id, ...doc.data() });
            });
            console.log("getAllUsers: Final users array:", users);
            return users;
        } catch (error) {
            console.error("Error fetching users:", error);
            return        }
    };

    const contextValue = {
        user,
        loading,
        error,
        registerUser,
        signInUser,
        logoutUser,
        forgotPassword,
        getAllUsers
    };

    return <UserContext.Provider value={contextValue}>
        {children}
    </UserContext.Provider>
}