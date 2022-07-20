import { ItemContext } from "./ItemContext";
import { useReducer, useContext, useState } from "react";
import { Item, ListState, ListOfLists } from "../types/interfaces";
import { listReducer } from "./listReducer";
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
  listId: 0, //<--- FILTER BY THIS IN ORDER TO SELECT DIFFERENT LISTS FROM DE LIST OF LISTS
  itemCount: 0,
  items: [],
  completed: 0,
  pending: 0,
  total: 0
};

export const ItemProvider: React.FC = ({ children }) => {
  const [firestoreItems, setFirestoreItems] = useState<DocumentData | null>(null);
  const [listOfLists, dispatchListOfLists] = useReducer(LIST_OF_LISTS);
  const [listState, dispatch] = useReducer(listReducer, INITIAL_STATE);
  const [currentList, setCurrentList] = useState<number>(0);

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
      await setDoc(docRef,  { listOfLists, currentList }); //<== This structure.
      const docCheck = await getDoc(docRef);
      const docData = docCheck.data();
      return docData!;
    }
  };

  const updateFirestore = (currentEmail: string | null) => {
    const docRef = doc(firestore, `products/${currentEmail}`);
    updateDoc(docRef, { listOfLists, currentList });
  }

  const values = {
    listState,
    listOfLists,
    dispatchListOfLists,
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
