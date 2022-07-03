import styles from "./ItemLi.module.scss";
import { FontAwesomeIcon, ProductIcon, RemoveIcon, CheckIcon } from "../icons";

type Props = {
  children: React.ReactNode;
  checked: "checked" | "";
  onDoubleClick: React.MouseEventHandler<HTMLLIElement>;
};

export const ItemLi: React.FC<Props> = ({
  onDoubleClick,
  children,
  checked = "checked",
}) => {
  return (
    <li onDoubleClick={onDoubleClick}>
      <div className={`${styles.productLiLeftSide} ${styles.checked}`}>
        <div className={`${styles.productIconContainer}`}>
          <i>
            <FontAwesomeIcon icon={ProductIcon}></FontAwesomeIcon>
          </i>
        </div>
        <p>{children}</p>
      </div>
      <div className={`${styles.productLiRightSide}`}>
        <div className={`${styles.iconContainer} ${styles.removeIconContainer}`}>
          <i>
            <FontAwesomeIcon icon={RemoveIcon}></FontAwesomeIcon>
          </i>
        </div>
        <div className={`${styles.iconContainer} ${styles.checkIconContainer}`}>
          <i>
            <FontAwesomeIcon icon={CheckIcon}></FontAwesomeIcon>
          </i>
        </div>
      </div>
    </li>
  );
};
