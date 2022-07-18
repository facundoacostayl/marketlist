import { ItemContext } from "./ItemContext";
import { useReducer, useContext, useState } from "react";
import { Item, ListState, ListOfLists } from "../types/interfaces";
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

const LIST_OF_LISTS: ListOfLists = {
  lists: []
} 

const INITIAL_STATE: ListState = {
  itemCount: 0,
  items: [],
  completed: 0,
  pending: 0,
};

export const ItemProvider: React.FC = ({ children }) => {
  const [firestoreItems, setFirestoreItems] = useState<DocumentData | null>(null);
  const [listState, dispatch] = useReducer(itemReducer, INITIAL_STATE);

  const cloneFireState = (listState: ListState) => {
    dispatch({type: "clone", payload: listState})
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
      await setDoc(docRef, { itemCount: listState.itemCount, items: listState.items, completed: listState.completed, pending: listState.pending });
      const docCheck = await getDoc(docRef);
      const docData = docCheck.data();
      return docData!;
    }
  };

  const updateFirestore = (currentEmail: string | null) => {
    const docRef = doc(firestore, `products/${currentEmail}`);
    updateDoc(docRef, {itemCount: listState.itemCount, items: listState.items, pending: listState.pending, completed: listState.completed});
  }

  const values = {
    listState,
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
