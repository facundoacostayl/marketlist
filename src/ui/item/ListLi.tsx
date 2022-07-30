import styles from "./ListLi.module.scss";
import { FontAwesomeIcon, ProductIcon, RemoveIcon, ListIcon, EditIcon } from "../icons";

import {ListState} from '../../Item/types/interfaces';

type Props = {
  children: React.ReactNode;
  onRemove?: VoidFunction;
  onSelectList: VoidFunction;
  onRemoveList: VoidFunction;
  selected: boolean;
};

export const ListLi: React.FC<Props> = ({
  onRemove,
  children,
  onSelectList,
  onRemoveList,
  selected
}) => {
  return (
    <li className={selected ? `${styles.liSelected}` : ""}>
      <div className={`${styles.productLiLeftSide}`}>
        <div className={`${styles.iconContainer} ${styles.listIconContainer}`}>
          <i>
            <FontAwesomeIcon className={`${styles.icon}`} icon={ListIcon}></FontAwesomeIcon>
          </i>
        </div>
        <p onClick={onSelectList}>{children}</p>
      </div>
      <div className={`${styles.productLiRightSide}`}>
      <div className={`${styles.iconContainer} ${styles.editIconContainer}`}>
          <i>
            <FontAwesomeIcon className={`${styles.icon}`} icon={EditIcon}></FontAwesomeIcon>
          </i>
        </div>
        <div onClick={onRemove} className={`${styles.iconContainer} ${styles.removeIconContainer}`}>
          <i>
            <FontAwesomeIcon onClick={onRemoveList} className={`${styles.icon}`} icon={RemoveIcon}></FontAwesomeIcon>
          </i>
        </div>
      </div>
    </li>
  );
};
