import styles from "./ItemLi.module.scss";
import { FontAwesomeIcon, ProductIcon, RemoveIcon, CheckIcon, UncheckIcon } from "../icons";

type Props = {
  children: React.ReactNode;
  checked: boolean;
  onDoubleClick: React.MouseEventHandler<HTMLLIElement>;
};

export const ItemLi: React.FC<Props> = ({
  onDoubleClick,
  children,
  checked,
}) => {
  return (
    <li className={`${styles.checked}`} onDoubleClick={onDoubleClick}>
      <div className={`${styles.productLiLeftSide}`}>
        <div className={`${styles.iconContainer} ${styles.productIconContainer}`}>
          <i>
            <FontAwesomeIcon className={`${styles.icon}`} icon={ProductIcon}></FontAwesomeIcon>
          </i>
        </div>
        <p>{children}</p>
      </div>
      <div className={`${styles.productLiRightSide}`}>
        <div className={`${styles.iconContainer} ${styles.removeIconContainer}`}>
          <i>
            <FontAwesomeIcon className={`${styles.icon}`} icon={RemoveIcon}></FontAwesomeIcon>
          </i>
        </div>
        <div className={`${styles.iconContainer} ${!checked ? styles.checkIconContainer : styles.unCheckIconContainer}`}>
          <i>
            <FontAwesomeIcon className={`${styles.icon}`} icon={!checked ? CheckIcon : UncheckIcon}></FontAwesomeIcon>
          </i>
        </div>
      </div>
    </li>
  );
};
