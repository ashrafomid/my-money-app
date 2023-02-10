import { async } from "@firebase/util";
import { useState } from "react";
import { firebaseAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
const useLogoutContext = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const logout = async () => {
    setError(null);
    setIsPending(true);
    try {
      await firebaseAuth.signOut();
      dispatch({ type: "LOGOUT" });
      setIsPending(false);
      setError(false);
    } catch (err) {
      console.log(error.message);
      setError(err.message);
      setIsPending(false);
    }
  };
  return { error, isPending, useLogoutContext };
};
