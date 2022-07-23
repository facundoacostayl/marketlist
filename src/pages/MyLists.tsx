import { useItem } from "../Item/context/ItemProvider";
import {useAuth} from '../Auth/context/AuthProvider';
import { ItemList, ItemLi, ListLi } from "../ui/item";
import { FontAwesomeIcon, AddIcon } from '../ui/icons';
import { useEffect, useRef } from "react";

export const MyLists = () => {
  const { listOfLists, addNewList, updateFirestore } = useItem();
  const { currentUser } = useAuth();
  
  const isFirstRun = useRef(true);

  useEffect(() => {
    if(isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }else {
      updateFirestore(currentUser && currentUser.email);
    }
  }, [listOfLists])

  return (
    <>
      <h1>Mis Listas</h1>
      <div className="addNewListDiv">
        <FontAwesomeIcon onClick={() => addNewList() } className="addNewListIcon" icon={AddIcon}></FontAwesomeIcon>
      </div>
      <ItemList>
        {!listOfLists.lists.length
          ? "Todavía no hay listas"
          : listOfLists.lists.map(list => {
            return <ListLi key={list.listId}>{list.listId}</ListLi>;
          })}
      </ItemList>
    </>
  );
};
