import { useState, useEffect } from 'react';
import styles from './ItemList.module.scss';
import {ItemState} from '../../Item/types/interfaces';

type Props = {
  newItem : ItemState
}

export const ItemList: React.FC<Props> = ({children, newItem}) => {

  const [itemIsNew, setItemIsNew] = useState(false);

  useEffect(() => {
    setItemIsNew(true);
    setTimeout(() => {
      setItemIsNew(false);
    }, 1000)
  }, [newItem])

  //LET'S REVERT ARRAY IN ORDER TO THE LAST ITEM ADDED IS ON THE TOP OF THE LIST.

  return (
    <ul className={`${styles.container} ${itemIsNew && styles.newItemAdded}`}>
      {children}
    </ul>
  )
}
