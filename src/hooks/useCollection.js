import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { firebaseAuth, firestoreDatabase } from "../firebase/config";

export const useCollection = (c) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    let ref = collection(firestoreDatabase, c);
    const q = query(ref, where("uid", "==", firebaseAuth.currentUser.uid));

    const unsub = onSnapshot(
      q,
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
