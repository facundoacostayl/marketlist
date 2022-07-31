import { useItem } from "../Item/context/ItemProvider";
import { useAuth } from "../Auth/context/AuthProvider";
import { ItemList, ItemLi, ListLi } from "../ui/item";
import { FontAwesomeIcon, AddIcon } from "../ui/icons";
import { Modal } from "../ui/controls/modal";
import { TextField } from "../ui/textField";
import { Button } from "../ui/controls/button";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ListState } from "../Item/types/interfaces";

interface Form extends React.FormEvent<HTMLFormElement> {
  text: HTMLInputElement
}

export const MyLists = () => {
  const {
    listOfLists,
    setListOfLists,
    addNewList,
    updateFirestore,
    setIsCurrentListChanged,
    cloneFireState,
  } = useItem();
  const { currentUser } = useAuth();

  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const [currentEditingList, setCurrentEditingList] = useState<ListState["listId"] | null>();

  const isFirstRun = useRef(true);
  const navigate = useNavigate();

  const onSelectList = (listId: ListState["listId"]) => {
    setListOfLists({ ...listOfLists, currentList: listId });
    setIsCurrentListChanged(true);
    navigate("/");
  };

  const onRemoveList = (listId: ListState["listId"]) => {
    setListOfLists({
      ...listOfLists,
      lists: [
        ...listOfLists.lists.filter((list: ListState) => {
          return list.listId != listId;
        }),
      ],
    });
  };

  const onEditListName = (e: Form) => {
    e.preventDefault();

    const listNameValue = e.currentTarget.text.value;

    setListOfLists({...listOfLists, lists: [...listOfLists.lists.map(list => {
        if(list.listId === currentEditingList) {
          return {...list, listName: listNameValue} 
        }
        return list;
    })]})

    setCurrentEditingList(null);
    setIsModalActive(false)
  };

  return (
    <>
    {isModalActive ? 
    <Modal onClose={() => setIsModalActive(false)}>
    <h4>Indica un nuevo nombre:</h4>
    <form onSubmit={onEditListName}>
      <TextField name="text" placeholder="Nuevo nombre de la lista" />
      <div className="">
        <Button onClick={() => setIsModalActive(false)} colorScheme="secondary">Cancelar</Button>
        <Button type="submit" colorScheme="primary">Confirmar</Button>
      </div>
    </form>
  </Modal>
  : null
  }
      
      <h1>Mis Listas</h1>
      <div className="addNewListDiv">
        <FontAwesomeIcon
          onClick={() => addNewList()}
          className="addNewListIcon"
          icon={AddIcon}
        ></FontAwesomeIcon>
      </div>
      <ItemList>
        {!listOfLists.lists.length
          ? "Todavía no hay listas"
          : listOfLists.lists.map((list) => {
              return (
                <ListLi
                  selected={
                    list.listId === listOfLists.currentList ? true : false
                  }
                  onToggleModal={() =>
                    setIsModalActive((isModalActive) => !isModalActive)
                  }
                  onGetListId = {() => setCurrentEditingList(list.listId)}
                  onSelectList={() => onSelectList(list.listId)}
                  onRemoveList={() => onRemoveList(list.listId)}
                  key={list.listId}
                >
                  {list.listName}
                </ListLi>
              );
            })}
      </ItemList>
    </>
  );
};
