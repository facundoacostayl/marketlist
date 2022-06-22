import React from 'react';
import styles from './Item.module.scss';

type Props = {
  children: React.ReactNode
  checked: "checked" | ""
  onDoubleClick: React.MouseEventHandler<HTMLLIElement>
}

export const ItemLi: React.FC<Props> = ({onDoubleClick, children, checked = "checked"}) => {
  return (
    <li onDoubleClick={onDoubleClick} className={styles[checked]}>{children}</li>
  )
}
