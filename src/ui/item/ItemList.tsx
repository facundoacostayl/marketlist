import { useState, useEffect } from 'react';
import styles from './ItemList.module.scss';
import {ListState} from '../../Item/types/interfaces';


export const ItemList: React.FC = ({children}) => {

  return (
    <ul className={`${styles.container}`}>
      {children}
    </ul>
  )
}
