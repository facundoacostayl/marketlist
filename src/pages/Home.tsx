import { useAuth } from "../Auth/context/AuthProvider";
import { Button } from "../ui/controls/button";
import { useNavigate, Link } from "react-router-dom";
import { TextField } from "../ui/textField";
import { Modal } from "../ui/controls/modal";
import { ModalFooter } from "../ui/controls/modal";
import { useState, FormEvent, useEffect, useRef, forwardRef } from "react";
import { useItem } from "../Item/context/ItemProvider";
import { ItemList } from "../ui/item/ItemList";
import { ItemLi } from "../ui/item/ItemLi";
import { Navbar } from "../ui/navbar";
import { PriceBox } from "../ui/priceBox";
import { FinishButton } from "../ui/finishButton";
import { FontAwesomeIcon, AddIcon } from "../ui/icons";

//TYPES//
import { Item, ListState, ListOfLists } from "../Item/types/interfaces";
/////////

interface Form extends HTMLFormElement {
  text: HTMLInputElement;
}

export const Home: React.FC = () => {
  const {
    listState,
    listOfLists,
    setListOfLists,
    cloneFireState,
    addItem,
    removeItem,
    toggleItem,
    checkOrCreateFirestore,
    firestoreItems,
    setFirestoreItems,
    updateFirestore,
  } = useItem();

  const { currentUser } = useAuth();
  const [isModalActive, setIsModalActive] = useState(false);
  const navigate = useNavigate();
  const isFirstRun = useRef(true);

  useEffect(() => {
    const firestoreRender = async () => {
      const data =
        currentUser && (await checkOrCreateFirestore(currentUser.email));
      data && setListOfLists(data as ListOfLists)
      //cloneFireState(data as ListState);
    };
    currentUser && firestoreRender();
  }, [currentUser]);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    } else {
      console.log(listState.items);
      updateFirestore(currentUser && currentUser.email);
    }
  }, [listState]);



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
          {isModalActive && (
            <Modal onClose={() => setIsModalActive(false)}>
              <h3>Ingresa el monto de tu compra</h3>
              <form className="modalForm">
                <div className="addTotalInput">
                  <TextField
                    placeholder="$"
                    type="text"
                    name="text"
                  ></TextField>
                </div>
                <ModalFooter>
                  <Button type="submit" colorScheme="primary">
                    Confirmar
                  </Button>
                  <Button
                    onClick={() => setIsModalActive(false)}
                    colorScheme="secondary"
                  >
                    Cancelar
                  </Button>
                </ModalFooter>
              </form>
            </Modal>
          )}

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
            <ItemList>
              {!listState.items.length ? (
                <p>No hay items en la lista</p>
              ) : (
                [...listState.items].reverse().map((item: Item) => {
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
                })
              )}
            </ItemList>
          </div>
          <div className="finishButtonsDiv">
            <FinishButton onOpenModal={() => setIsModalActive(true)} />
            <PriceBox />
          </div>
          {!currentUser && <span className="adviceMessage">¡<Link className="adviceLink" to="/login">Inicia sesión</Link> para comenzar a guardar tus listas!</span>}
    </>
  );
};
