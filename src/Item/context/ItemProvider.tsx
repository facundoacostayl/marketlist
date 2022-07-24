import { ItemContext } from "./ItemContext";
import { useReducer, useContext, useState, useEffect } from "react";
import { Item, ListState, ListOfLists } from "../types/interfaces";
import { useAuth } from "../../Auth/context/AuthProvider";
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
  lists: [],
  currentList: 0,
};

const INITIAL_STATE: ListState = {
  listId: 0, //<--- FILTER BY THIS IN ORDER TO SELECT DIFFERENT LISTS FROM DE LIST OF LISTS
  itemCount: 0,
  items: [],
  completed: 0,
  pending: 0,
  arsTotal: 0,
  usdTotal: 0
};

export const ItemProvider: React.FC = ({ children }) => {
  const [firestoreItems, setFirestoreItems] = useState<DocumentData | null>(
    null
  );
  const [listOfLists, setListOfLists] = useState<ListOfLists>(LIST_OF_LISTS);
  const [listState, dispatch] = useReducer(listReducer, INITIAL_STATE);
  const [isCurrentListChanged, setIsCurrentListChanged] = useState<boolean>(false);


  const { currentUser } = useAuth();

  const checkOrCreateFirestore = async (
    idDoc: string | null
  ): Promise<DocumentData> => {
    const docRef = doc(firestore, `products/${idDoc}`);
    const docCheck = await getDoc(docRef);
    if (docCheck.exists()) {
      const docData = docCheck.data();
      return docData;
    } else {
      await setDoc(docRef, { listOfLists });
      const docCheck = await getDoc(docRef);
      const docData = docCheck.data();
      docData ? (docData.listOfLists.currentList = +new Date()) : null;
      docData?.listOfLists.lists.push({
        listId: docData.listOfLists.currentList,
        itemCount: 0,
        items: [],
        completed: 0,
        pending: 0,
        arsTotal: 0,
        usdTotal: 0
      });
      console.log(docData);
      return docData!;
    }
  };

  const updateFirestore = (currentEmail: string | null) => {
    const docRef = doc(firestore, `products/${currentEmail}`);
    updateDoc(docRef, { listOfLists });
  };

  const addNewList = (listId: ListState["listId"] = +new Date(), itemName?: Item["name"]) => {
    setListOfLists({
      ...listOfLists,
      lists: [
        ...listOfLists.lists,
        {
          listId: listId,
          itemCount: 0,
          items: itemName ? [
          {
          id: +new Date(),
          name: itemName,
          checked: false,
          }] : [],
          completed: 0,
          pending: 0,
          arsTotal: 0,
          usdTotal: 0
        },
      ],
    });

    console.log("Done");
  };

  const cloneFireState = (listState: ListState) => {
    dispatch({ type: "clone", payload: listState });
  };

  const addItem = (item: Item["name"]) => {
    dispatch({ type: "add", payload: item });
  };

  const removeItem = (itemId: Item["id"]) => {
    dispatch({ type: "remove", payload: { id: itemId } });
  };

  const toggleItem = (itemId: Item["id"]) => {
    dispatch({ type: "toggle", payload: { id: itemId } });
  };

  useEffect(() => {
    const currentListRender = async () => {
      const data =
        currentUser && (await checkOrCreateFirestore(currentUser.email));
      const currentList = data?.listOfLists.lists.find(
        (list: ListState) => list.listId === data.listOfLists.currentList
      );
      setListOfLists(data?.listOfLists);
      currentList ? cloneFireState(currentList) : null;
    };
    currentUser && currentListRender();
    setIsCurrentListChanged(false);
  }, [currentUser, isCurrentListChanged]);

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
    updateFirestore,
    isCurrentListChanged,
    setIsCurrentListChanged
  };

  return <ItemContext.Provider value={values}>{children}</ItemContext.Provider>;
};
