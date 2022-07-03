import { ItemContext } from "./ItemContext";
import { useReducer, useContext, useState } from "react";
import { Item, ItemState } from "../types/interfaces";
import { itemReducer } from "./itemReducer";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  DocumentData,
  updateDoc,
} from "firebase/firestore";
import { firebaseApp } from "../credentials";

export const useItem = () => {
  return useContext(ItemContext);
};

const firestore = getFirestore(firebaseApp);

const INITIAL_STATE: ItemState = {
  itemCount: 0,
  items: [],
  completed: 0,
  pending: 0,
};

export const ItemProvider: React.FC = ({ children }) => {
  const [firestoreItems, setFirestoreItems] = useState<DocumentData | null>(null);
  const [itemState, dispatch] = useReducer(itemReducer, INITIAL_STATE);

  const cloneFireState = (itemState: ItemState) => {
    dispatch({type: "clone", payload: itemState})
  }
  
  const addItem = (item: Item["name"]) => {
    dispatch({ type: "add", payload: item });
  };

  const removeItem = (itemId: Item["id"]) => {
    dispatch({ type: "remove", payload: {id: itemId}})
  }
  
  const toggleItem = (itemId: Item["id"]) => {
    dispatch({type: "toggle", payload: {id: itemId}})
  }

  const checkOrCreateFirestore = async (
    idDoc: string | null
  ): Promise<DocumentData> => {
    const docRef = doc(firestore, `products/${idDoc}`);
    const docCheck = await getDoc(docRef);
    if (docCheck.exists()) {
      const docData = docCheck.data();
      return docData;
    } else {
      await setDoc(docRef, { itemCount: itemState.itemCount, items: itemState.items, completed: itemState.completed, pending: itemState.pending });
      const docCheck = await getDoc(docRef);
      const docData = docCheck.data();
      return docData!;
    }
  };

  const updateFirestore = (currentEmail: string | null) => {
    const docRef = doc(firestore, `products/${currentEmail}`);
    updateDoc(docRef, {itemCount: itemState.itemCount, items: itemState.items, pending: itemState.pending, completed: itemState.completed});
  }

  const values = {
    itemState,
    cloneFireState,
    addItem,
    removeItem,
    toggleItem,
    checkOrCreateFirestore,
    firestoreItems,
    setFirestoreItems,
    updateFirestore
  };

  return <ItemContext.Provider value={values}>{children}</ItemContext.Provider>;
};
