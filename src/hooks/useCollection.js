import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { firebaseAuth } from "../firebase/config";

export const useCollection = (c) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    let ref = collection(firebaseAuth, c);
    const unsub = onSnapshot(
      ref,
      (snap) => {
        let results = [];
        snap.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });
        setDocuments(results);
        setError(null);
      },
      (err) => {
        setError(err.message);
      }
    );
    //update state
    return () => unsub();
  }, [c]);
  return { documents, error };
};
