import { ItemContext } from "./ItemContext";
import { useReducer, useContext, useState } from "react";
import { Item, ListState, ListOfLists } from "../types/interfaces";
import { listReducer } from "./listReducer";
import {listOfListsReducer} from './listOfListsReducer';
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
  lists: [],
  currentList: 0
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
  const [listOfLists, setListOfLists] = useState<ListOfLists>(LIST_OF_LISTS);
  const [listState, dispatch] = useReducer(listReducer, INITIAL_STATE);

  const addNewList = () => {
    setListOfLists({...listOfLists, lists: [
      {
        listId: +new Date(),
        itemCount: 0,
        items: [],
        completed: 0,
        pending: 0,
        total : 0
      }
    ]})
  }

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
      await setDoc(docRef,  { listOfLists, currentList: listOfLists.currentList }); //<== This structure.
      const docCheck = await getDoc(docRef);
      const docData = docCheck.data();
      return docData!;
    }
  };

  const updateFirestore = (currentEmail: string | null) => {
    const docRef = doc(firestore, `products/${currentEmail}`);
    updateDoc(docRef, { listOfLists, currentList: listOfLists.currentList });
  }

  const values = {
    listState,
    listOfLists,
    setListOfLists,
    addNewList,
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
