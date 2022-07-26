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
  total: HTMLInputElement;
}

export const Home: React.FC = () => {
  const {
    listOfLists,
    setListOfLists,
    listState,
    addItem,
    removeItem,
    toggleItem,
    updateFirestore,
    cloneFireState,
    addNewList,
  } = useItem();

  const { currentUser } = useAuth();
  const [isModalActive, setIsModalActive] = useState(false);
  const [listUsdTotal, setListUsdTotal] = useState<number>(0)
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    } else{
      setListOfLists({
        ...listOfLists,
        lists: [
          ...listOfLists.lists.map((list) => {
            if (list.listId === listState.listId) {
              return listState;
            }
            return list;
          }),
        ],
      });
    }
  }, [listState]);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }else {
    console.log("SECOND") //<---- WHY IS THIS RUNNING ?
    currentUser && updateFirestore(currentUser.email);
    }
  }, [listOfLists]);

  const onSubmitItem = (e: FormEvent<Form>) => {
    e.preventDefault();

    const itemTarget = e.currentTarget.text;

    if (!itemTarget.value.length) return;

    addItem(itemTarget.value);

    itemTarget.value = "";
  };

  const onRemoveItem = (itemId: Item["id"]) => {
    removeItem(itemId);
  };

  const onToggleItem = (itemId: Item["id"]) => {
    toggleItem(itemId);
  };

  const convertCurrency = async (arsTotal: number) => {
    const myHeaders = new Headers();
      myHeaders.append(
        "apikey",
        "lMJAkiwejbkZEEE0gCBCrVxTaRtK3yHV3AwJNPRQ"
      );

      const response = await fetch(
        `https://api.currencyapi.com/v3/latest?apikey=lMJAkiwejbkZEEE0gCBCrVxTaRtK3yHV3AwJNPRQ`,
        {
          method: "GET",
          redirect: "follow",
          headers: myHeaders,
        }
      );

      const parseRes = await response.json();
        console.log(parseRes)
        cloneFireState({
          ...listState,
          arsTotal: arsTotal,
          usdTotal: arsTotal / parseInt(parseRes.data.ARS.value),
        });
  }

  const onSubmitTotal = (e: FormEvent<Form>) => {
    e.preventDefault();

    convertCurrency(parseInt(e.currentTarget.total.value));

    setIsModalActive(false);
  };

  return (
    <>
      {isModalActive && (
        <Modal onClose={() => setIsModalActive(false)}>
          <h3>Ingresa el monto de tu compra</h3>
          <form onSubmit={onSubmitTotal} className="modalForm">
            <div className="addTotalInput">
              <TextField placeholder="$" type="text" name="total"></TextField>
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
      <form onSubmit={onSubmitItem}>
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
        <PriceBox arsTotal={listState.arsTotal} usdTotal={listState.usdTotal} />
      </div>
      {!currentUser && (
        <span className="adviceMessage">
          ¡
          <Link className="adviceLink" to="/login">
            Inicia sesión
          </Link>{" "}
          para comenzar a guardar tus listas!
        </span>
      )}
    </>
  );
};
