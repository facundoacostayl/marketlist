import styles from "./ItemList.module.scss";

export const ItemList: React.FC = ({ children }) => {
  return <ul className={`${styles.container}`}>{children}</ul>;
};
