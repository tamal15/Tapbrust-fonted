import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import initial from "../Login/Firebase/firebase.init";

initial();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState('');
  const [admin, setAdmin] = useState(false);
  const [buyer, setBuyer] = useState(false);
  const [error, setError] = useState("");

  const auth = getAuth(); // Use the app instance to get auth
  const googleProvider = new GoogleAuthProvider();

  // Register user with email, password, and payment details
  const registerUser = (email, password, name, bkashNumber, refCode, location, status = "pending", navigate) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const users = userCredential.user;
        

        sendEmailVerification(users)
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'plesae check your email verify..!',
              confirmButtonText: 'OK',
            });
           
          })
        const newUser = { email, displayName: name, bkashNumber, refCode };
        setUser(newUser);

        // Save user to database with payment details
        sendUser(email, name, bkashNumber, refCode, status, 'POST');

        // Send name to Firebase after creation
        updateProfile(auth.currentUser, {
          displayName: name
        }).then(() => {})
          .catch((error) => {});

        setAuthError('');
        const destination = location?.state?.from || '/';
        navigate(destination);
      })
      .catch((error) => {
        setAuthError(error.message);
      })
      .finally(() => setIsLoading(false));
  };



  // Observer user state and check email verification
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.emailVerified) {
          setUser(user); // If email is verified, set the user state
        } else {
          // If email is not verified, log out the user and ask to verify email
          signOut(auth).then(() => {
            setAuthError('Please verify your email address.');
          }).catch((error) => console.error('Logout error:', error.message));
        }
      } else {
        setUser({});
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

  // Login with Google
  const loginWithGoogle = (location, navigate) => {
    setIsLoading(true);
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;

        // Save user to the database (optional)
        sendUser(user.email, user.displayName, '', '', 'active', 'PUT');

        // Clear previous errors
        setAuthError('');

        // Navigate to the destination or home
        const destination = location?.state?.from || '/';
        navigate(destination);
      })
      .catch((error) => {
        setAuthError(error.message);
        console.error("Google login failed:", error);
      })
      .finally(() => setIsLoading(false));
  };

  // Login with email and password
  const loginWithOwnEmailAndPass = (email, password, location, navigate) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if(userCredential.user.emailVerified){
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Email verified successfully!',
            confirmButtonText: 'OK',
          });
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'error',
            text: 'Plesae Email Verified!',
            confirmButtonText: 'OK',
          });
        }
        const destination = location?.state?.from || '/';
        navigate(destination);
        setAuthError('');
      })
      .catch((error) => {
        setAuthError(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  // Verify email
  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then((result) => {
        console.log(result);
      });
  };

  // Log out user
  const userLogOut = () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      }).catch((error) => {
        setError(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  // Save user to database
  const sendUser = (email, displayName, bkashNumber, refCode, status = "pending", method) => {
    const user = { email, displayName, bkashNumber, refCode, status, balance: 0 };
    fetch('https://tapbrust-backend.onrender.com/users', {
      method: method,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => console.error('Error:', error));
  };

  // Observer user state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
      setIsLoading(false);
    });
    return () => unsubscribe; // This should call the unsubscribe function
  }, [auth]);

  // Load user roles from database
  useEffect(() => {
    fetch(`https://tapbrust-backend.onrender.com/users/${user?.email}`)
      .then(res => res.json())
      .then(data => {
        setBuyer(data?.buyer);
      });
  }, [user?.email]);

  // Load admin role from database
  useEffect(() => {
    fetch(`https://tapbrust-backend.onrender.com/userLogin/${user?.email}`)
      .then(res => res.json())
      .then(data => setAdmin(data?.admin));
  }, [user?.email]);

  // Send password reset email
  const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true, message: 'Password reset email sent successfully!' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  return {
    user,
    registerUser,
    isLoading,
    authError,
    error,
    admin,
    buyer,
    userLogOut,
    loginWithGoogle,
    loginWithOwnEmailAndPass,
    sendPasswordReset, // Include sendPasswordReset function
  };
}

export default useFirebase;
