import styles from "./ListLi.module.scss";
import { FontAwesomeIcon, ProductIcon, RemoveIcon, ListIcon, EditIcon } from "../icons";

type Props = {
  children: React.ReactNode;
  onRemove?: VoidFunction;
};

export const ListLi: React.FC<Props> = ({
  onRemove,
  children,
}) => {
  return (
    <li>
      <div className={`${styles.productLiLeftSide}`}>
        <div className={`${styles.iconContainer} ${styles.listIconContainer}`}>
          <i>
            <FontAwesomeIcon className={`${styles.icon}`} icon={ListIcon}></FontAwesomeIcon>
          </i>
        </div>
        <p style={{color: 'gray'}}>{children}</p>
      </div>
      <div className={`${styles.productLiRightSide}`}>
      <div className={`${styles.iconContainer} ${styles.editIconContainer}`}>
          <i>
            <FontAwesomeIcon className={`${styles.icon}`} icon={EditIcon}></FontAwesomeIcon>
          </i>
        </div>
        <div onClick={onRemove} className={`${styles.iconContainer} ${styles.removeIconContainer}`}>
          <i>
            <FontAwesomeIcon className={`${styles.icon}`} icon={RemoveIcon}></FontAwesomeIcon>
          </i>
        </div>
      </div>
    </li>
  );
};
