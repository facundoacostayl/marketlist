import {useItem} from '../Item/context/ItemProvider';

export const MyLists = () => {

  const {listOfLists} = useItem();

  return (
    <>
      <ul>
        {listOfLists.lists.map(item => {
          <li>{item.listId}</li>
        })}
      </ul>
    </>
  )
}
