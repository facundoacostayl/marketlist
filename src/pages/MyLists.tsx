import { useItem } from "../Item/context/ItemProvider";
import {useAuth} from '../Auth/context/AuthProvider';
import { ItemList, ItemLi, ListLi } from "../ui/item";
import { FontAwesomeIcon, AddIcon } from '../ui/icons';
import { useEffect, useRef, useState } from "react";
import {useNavigate} from 'react-router-dom';

import {ListState} from '../Item/types/interfaces';

export const MyLists = () => {
  const { listOfLists, setListOfLists, addNewList, updateFirestore, setIsCurrentListChanged } = useItem();
  const { currentUser } = useAuth();
  
  const isFirstRun = useRef(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(listOfLists)
    if(isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }else {
      updateFirestore(currentUser && currentUser.email);
    }
  }, [listOfLists])

  const selectList = (listId: ListState["listId"]) => {
    setListOfLists({...listOfLists, currentList: listId})
    setIsCurrentListChanged(true);
    navigate("/");
  }

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
            return <ListLi onSelectList={() => selectList(list.listId)} key={list.listId}>{list.listId}</ListLi>;
          })}
      </ItemList>
    </>
  );
};
