import React, { createContext } from "react";
import { ListOfLists, ListState, Item } from "../types/interfaces";
import { DocumentData } from "firebase/firestore";

type ItemContextProps = {
  listState: ListState;
  listOfLists: ListOfLists;
  setListOfLists: React.Dispatch<React.SetStateAction<ListOfLists>>;
  cloneFireState: (ListState: ListState) => void;
  addItem: (itemId: Item["name"]) => void;
  removeItem: (itemId: Item["id"]) => void;
  toggleItem: (itemId: Item["id"]) => void;
  checkOrCreateFirestore: (idDoc: string | null) => Promise<DocumentData>;
  firestoreItems: DocumentData | null;
  setFirestoreItems: React.Dispatch<React.SetStateAction<DocumentData | null>>;
  updateFirestore: (emailDoc: string | null) => void
};

export const ItemContext = createContext<ItemContextProps>(
  {} as ItemContextProps
);
