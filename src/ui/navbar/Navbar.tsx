import styles from "./Navbar.module.scss";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon, UserIcon } from "../icons";
import {UserMenu} from '../userMenu';

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
        <div className={`${styles.iconAndIconMenu}`}>
        <div onClick={isAuth ? onSignOut : () => navigate("/login")} className={`${styles.signGroup}`}>
           <FontAwesomeIcon
            className={`${styles.icon}`}
            icon={UserIcon}
          ></FontAwesomeIcon>
        </div>
        <UserMenu></UserMenu>
        </div>
      </div>
    </nav>
  );
};
