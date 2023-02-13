import { useReducer, useEffect, useState } from "react";
import { firestoreDatabase } from "../firebase/config";
import {
  collection,
  addDoc,
  Timestamp,
  deleteDoc,
  doc,
} from "firebase/firestore";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};
const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { isPending: true, document: null, success: false, error: null };
    case "ADDED_DOCUMENT":
      return {
        ...state,
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "DELETED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "ERROR":
      return {
        ...state,
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const useFirestore = (c) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCanceled, setIsCanceled] = useState(false);
  const dipatchIfNotCancelled = (action) => {
    if (!isCanceled) {
      dispatch(action);
    }
  };
  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const createdAt = Timestamp.fromDate(new Date());
      const addedDoc = await addDoc(collection(firestoreDatabase, c), {
        ...doc,
        createdAt,
      });
      dipatchIfNotCancelled({ type: "ADDED_DOCUMENT", payload: addedDoc });
    } catch (err) {
      dipatchIfNotCancelled({ type: "ERROR", payload: err.message });
      console.log("error happened");
    }
  };
  const deleteDocument = (id) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const deletedDocument = deleteDoc(doc(firestoreDatabase, c, id)).then(
        () => {
          console.log("Deleted Compeletely");
        }
      );
      dipatchIfNotCancelled({
        type: "DELETED_DOCUMENT",
        payload: deletedDocument,
      });
    } catch (err) {
      console.log(err.message);
      dipatchIfNotCancelled({
        type: "ERROR",
        payload: "Could not delete the item here",
      });
    }
  };
  useEffect(() => {
    return () => setIsCanceled(true);
  }, []);
  return { addDocument, response, deleteDocument };
};
