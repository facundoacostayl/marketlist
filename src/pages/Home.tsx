import { useAuth } from "../Auth/context/AuthProvider";
import { Button } from "../ui/controls/button";
import { useNavigate } from "react-router-dom";
import { TextField } from "../ui/textField";
import { Modal } from "../ui/controls/modal";
import { ModalFooter } from "../ui/controls/modal";
import { Item, ItemState } from "../Item/types/interfaces";
import { useState, FormEvent, useEffect, useRef, forwardRef } from "react";
import { useItem } from "../Item/context/ItemProvider";
import { ItemList } from "../ui/item/ItemList";
import { ItemLi } from "../ui/item/ItemLi";
import { Navbar } from "../ui/navbar";
import { PriceBox } from "../ui/priceBox";
import { FinishButton } from "../ui/finishButton";
import { FontAwesomeIcon, AddIcon } from "../ui/icons";

interface Form extends HTMLFormElement {
  text: HTMLInputElement;
}

export const Home: React.FC = () => {
  const {
    itemState,
    cloneFireState,
    addItem,
    removeItem,
    toggleItem,
    checkOrCreateFirestore,
    firestoreItems,
    setFirestoreItems,
    updateFirestore,
  } = useItem();

  const { onSignOut, currentUser } = useAuth();
  const [isModalActive, setIsModalActive] = useState(false);
  const navigate = useNavigate();
  const isFirstRun = useRef(true);

  useEffect(() => {
    const firestoreRender = async () => {
      const data =
        currentUser && (await checkOrCreateFirestore(currentUser.email));
      data && cloneFireState(data as ItemState);
    };
    currentUser && firestoreRender();
  }, [currentUser]);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    } else {
      console.log(itemState.items);
      updateFirestore(currentUser && currentUser.email);
    }
  }, [itemState]);

  const signOutHandler = () => {
    try {
      onSignOut();
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitHandler = (e: FormEvent<Form>) => {
    e.preventDefault();

    const itemTarget = e.currentTarget.text;

    if (!itemTarget.value.length) return;

      addItem(itemTarget.value);
      itemTarget.value = "";

  };

  const onRemoveItem = (itemId: Item["id"]) => {
    removeItem(itemId);
    //updateFirestore(currentUser ? currentUser.email: null);
  };

  const onToggleItem = (itemId: Item["id"]) => {
    toggleItem(itemId);
  };

  return (
    <>
      <div className="container">
      <Navbar isAuth={currentUser ? true : false} onSignOut={signOutHandler} />
      <header className="appMain">
          <h1>Tu lista</h1>
          <form onSubmit={onSubmitHandler}>
            <div className="addProductInput">
              <TextField
                autoFocus
                name="text"
                placeholder="Agrega un producto..."
              />
              <div className="addProductButtonGroup">
                <button className="addProductButton">
                  <FontAwesomeIcon className="addProductIcon" icon={AddIcon} />
                </button>
              </div>
            </div>
          </form>
        <div className="listDiv">
          <ItemList newItem={itemState}>
            {!itemState.items.length
              ? "loading..."
              : [...itemState.items].reverse().map((item: Item) => {
                  return (
                    <ItemLi
                      onToggle={() => onToggleItem(item.id)}
                      key={item.id}
                      onRemove={() => onRemoveItem(item.id)}
                      checked={item.checked}
                    >
                      {item.name}
                    </ItemLi>
                  );
                })}
          </ItemList>
        </div>
        <div className="finishButtonsDiv">
          <FinishButton />
          <PriceBox />
        </div>
      </header>
      </div>
    </>
  );
};
