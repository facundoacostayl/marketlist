import { useItem } from "../Item/context/ItemProvider";
import { ItemList, ItemLi } from "../ui/item";

export const MyLists = () => {
  const { listOfLists } = useItem();

  console.log(listOfLists)

  return (
    <>
      <h1>Mis Listas</h1>
      <ItemList>
        {!listOfLists.lists
          ? "Todavía no hay listas"
          : listOfLists.lists.map((item) => {
              <ItemLi>{item.listId}</ItemLi>;
            })}
      </ItemList>
    </>
  );
};
