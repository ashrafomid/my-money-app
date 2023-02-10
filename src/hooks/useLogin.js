import { useEffect, useState } from "react";
import { firebaseAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
export const useLogin = () => {
  const [isCanceled, setIsCanceled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const login = async (email, password) => {
    setError(null);
    setIsPending(true);
    try {
      const res = await firebaseAuth.signInWithEmailAndPassword(
        email,
        password
      );
      dispatch({ type: "LOGIN", payload: res.user });
      if (!isCanceled) {
        setIsPending(false);
        setError(false);
      }
    } catch (err) {
      if (!isCanceled) {
        console.log(error.message);
        setError(err.message);
        setIsPending(false);
      }
    }
  };
  useEffect(() => {
    return () => {
      setIsCanceled(true);
    };
  }, []);
  return { error, isPending, login };
};
