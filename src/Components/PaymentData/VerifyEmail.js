// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { auth } from "../../Login/Firebase/firebase.init";
// import { onAuthStateChanged } from "firebase/auth";

// function VerifyEmail() {
//     const [message, setMessage] = useState("Checking email verification status...");
//     const navigate = useNavigate();

//     // Check the user's email verification status
//     const checkUserEmailVerified = async (user) => {
//         if (user) {
//             await user.reload(); // Reload user state from Firebase
//             if (user.emailVerified) {
//                 setMessage("Email successfully verified! Redirecting to home...");
//                 setTimeout(() => {
//                     navigate("/"); // Navigate to home page after a delay
//                 }, 1500);
//             } else {
//                 setMessage("Email is not verified yet. Please check your inbox.");
//             }
//         } else {
//             setMessage("No user found. Please log in.");
//         }
//     };

//     // Listen for authentication state changes
//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, (user) => {
//             if (user) {
//                 checkUserEmailVerified(user); // Check email verification
//             } else {
//                 setMessage("No user found. Please log in.");
//             }
//         });

//         // Clean up the listener when the component is unmounted
//         return () => unsubscribe();
//     }, []);

//     return (
//         <div>
//             <p>{message}</p>
//             <button onClick={() => checkUserEmailVerified(auth.currentUser)}>
//                 Refresh and Check Verification
//             </button>
//         </div>
//     );
// }

// export default VerifyEmail;
