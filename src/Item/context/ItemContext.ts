import { createContext } from "react";
import { ItemState, Item } from "../types/interfaces";
import { DocumentData } from "firebase/firestore";

type ItemContextProps = {
  itemState: ItemState;
  cloneFireState: (itemState: ItemState) => void;
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
