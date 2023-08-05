// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from 'firebase/auth';
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCZ8ph6L85aKCJIgWkYNkjLMBLnjIkKZfw",
    authDomain: "todo-app-35cb0.firebaseapp.com",
    projectId: "todo-app-35cb0",
    storageBucket: "todo-app-35cb0.appspot.com",
    messagingSenderId: "621191082374",
    appId: "1:621191082374:web:644d30488850b77fb17c07",
    measurementId: "G-BNZJ7393QK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

//Sign up new users
export const firebaseSignUpWithEmailAndPassword = async ({ email, password }) => {
    if (!email || !password) {
        alert('empty email/password');
        return;
    }
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        return userCredential.user;
    } catch (error) {
        switch (error.code) {
            case 'auth/weak-password':
                alert('Password length must be at least 6 characters long');
                break;
            case 'auth/email-already-in-use':
                alert('Already signed up!');
                break;
            default:
                alert(`code: ${error.code} message: ${error.message}`)
        }
    }
    // .then((userCredential) => {
    //     // Signed in 
    //     const user = userCredential.user;
    //     console.log({ user })
    //     // ...
    // })
    // .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.log({ errorCode, errorMessage })
    //     // ..
    // });
}

export const firebaseSignInWithEmailAndPassword = async ({ email, password }) => {
    // console.log({ email, password })
    if (!email || !password) {
        alert('empty email/password');
        return;
    }
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        // const firebaseError = error as FirebaseAuthError;
        switch (error.code) {
            case 'auth/user-not-found':
                alert('Email not found!');
                break;
            case 'auth/wrong-password':
                alert('Password does not match!');
                break;
            default:
                console.log(error.message);
        }
    }
}

export const onAuthStateChangedListener = (callback) =>
    onAuthStateChanged(auth, callback)

export const signOutUser = async () => {
    await signOut(auth);
}

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (userAuth) => {
                // we want to close the listener to avoid memory leaks
                unsubscribe();
                resolve(userAuth)
            },
            reject //deprecated third arg
        )
    })
}