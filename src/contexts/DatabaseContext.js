import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

/**
 * Import Packages
 */
import {
  collection,
  doc,
  getDocs,
  addDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

import { useFirestore } from "./FirestoreContext";
import { useEffect } from "./MainMenuContext";
import { encryptData, decryptPublicKey } from "../func/encryption";

/**
 * Create Context for Provider
 */
export const DatabaseContext = createContext();

/**
 * Hook for Firestore Context
 *
 * @returns Context
 */
export function useDatabase() {
  return useContext(DatabaseContext);
}

/**
 *
 * @param {Object} props
 * @returns
 */
export const DatabaseProvider = ({ children }) => {
  const { db } = useFirestore();

  const getItems = async (collectionName) => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const items = [];
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });
    return items;
  };

  const addItem = async (collectionName, item) => {
    const { id, ...itemData } = item;

    const docRef = await addDoc(collection(db, collectionName), itemData);

    return docRef.id;
  };

  const updateItem = async (collectionName, item) => {
    const { id, ...itemData } = item;

    await setDoc(doc(db, collectionName, id), itemData);

    return id;
  };

  const deleteItem = async (collectionName, item) => {
    const { id } = item;

    await deleteDoc(doc(db, collectionName, id));

    return;
  };

  return (
    <DatabaseContext.Provider
      value={{
        getItems,
        addItem,
        updateItem,
        deleteItem,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};
