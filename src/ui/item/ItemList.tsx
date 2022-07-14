import { useState, useEffect } from 'react';
import styles from './ItemList.module.scss';
import {ItemState} from '../../Item/types/interfaces';


export const ItemList: React.FC = ({children}) => {

  return (
    <ul className={`${styles.container}`}>
      {children}
    </ul>
  )
}
