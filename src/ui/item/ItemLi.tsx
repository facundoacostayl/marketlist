import styles from "./ItemLi.module.scss";
import { FontAwesomeIcon, ProductIcon, RemoveIcon, CheckIcon, UncheckIcon } from "../icons";

type Props = {
  children: React.ReactNode;
  checked: boolean;
  onToggle: VoidFunction;
  onRemove: VoidFunction;
};

export const ItemLi: React.FC<Props> = ({
  onToggle,
  onRemove,
  children,
  checked,
}) => {
  return (
    <li>
      <div className={`${styles.productLiLeftSide}`}>
        <div className={`${styles.iconContainer} ${!checked ? styles.productIconContainer : styles.checkIconContainer}`}>
          <i>
            <FontAwesomeIcon className={`${styles.icon}`} icon={ProductIcon}></FontAwesomeIcon>
          </i>
        </div>
        <p style={checked ? {color: 'rgb(63, 197, 63)'} : {color: 'gray'}}>{children}</p>
      </div>
      <div className={`${styles.productLiRightSide}`}>
        <div onClick={onRemove} className={`${styles.iconContainer} ${styles.removeIconContainer}`}>
          <i>
            <FontAwesomeIcon className={`${styles.icon}`} icon={RemoveIcon}></FontAwesomeIcon>
          </i>
        </div>
        <div onClick={onToggle} className={`${styles.iconContainer} ${!checked ? styles.checkIconContainer : styles.unCheckIconContainer}`}>
          <i>
            <FontAwesomeIcon className={`${styles.icon}`} icon={!checked ? CheckIcon : UncheckIcon}></FontAwesomeIcon>
          </i>
        </div>
      </div>
    </li>
  );
};
