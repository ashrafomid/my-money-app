import { useEffect, useState } from "react";
import { firebaseAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
export const useLogoutContext = () => {
  const [isCanceled, setIsCanceled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const logout = async () => {
    setError(null);
    setIsPending(true);
    try {
      await firebaseAuth.signOut();
      dispatch({ type: "LOGOUT" });
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
  return { error, isPending, logout };
};
