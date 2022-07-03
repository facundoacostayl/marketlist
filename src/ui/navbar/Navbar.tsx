import styles from "./Navbar.module.scss";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon, LoginIcon } from "../icons";

type Props = {
  onSignOut: VoidFunction;
  isAuth: boolean;
};

export const Navbar: React.FC<Props> = ({ onSignOut, isAuth }) => {
  const navigate = useNavigate();

  return (
    <nav className={`${styles.navbar}`}>
      <div className={`${styles.container}`}>
        <a href="#">Check It!</a>
        <div onClick={isAuth ? onSignOut : () => navigate("/login")} className={`${styles.signGroup}`}>
          <span>{isAuth ? "Cerrar sesión" : "Iniciar sesión"}</span>
          <FontAwesomeIcon
            className={`${styles.icon}`}
            icon={LoginIcon}
          ></FontAwesomeIcon>
        </div>
      </div>
    </nav>
  );
};
