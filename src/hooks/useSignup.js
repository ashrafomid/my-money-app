import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { firebaseAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const signUp = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);
    try {
      //signup user
      const auth = firebaseAuth;
      const res = await createUserWithEmailAndPassword(auth, email, password);
      if (!res) {
        throw new Error("Could not create an account for this user");
      } else {
        await updateProfile(auth.currentUser, displayName);
        //dispatch user login
        dispatch({ type: "LOGIN", payload: res.user });
        setError(null);
        setIsPending(false);
      }
    } catch (err) {
      setError(err.message);
      setIsPending(false);
    }
  };
  return { error, isPending, signUp };
};
