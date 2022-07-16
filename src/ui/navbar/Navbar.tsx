import styles from "./Navbar.module.scss";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon, UserIcon, LoginIcon } from "../icons";
import {UserMenu} from '../userMenu';

type Props = {
  isAuth: boolean;
};

export const Navbar: React.FC<Props> = ({ isAuth }) => {
  const navigate = useNavigate();

  const [isUserMenu, setIsUserMenu] = useState<boolean>(false);

  return (
    <nav className={`${styles.navbar}`}>
      <div className={`${styles.container}`}>
        <a href="#">Check It!</a>
        {isAuth ? 
        <div className={`${styles.iconAndIconMenu}`}>
        <div onClick={() => setIsUserMenu(true)}>
           <FontAwesomeIcon
            className={`${styles.icon}`}
            icon={UserIcon}
          ></FontAwesomeIcon>
        </div>
        {isUserMenu && <UserMenu/>}
        </div>
        : 
        <div className={`${styles.signGroup}`}>
            {!isAuth && <span>Registrate</span>}
           <FontAwesomeIcon className={styles.icon} onClick={() => navigate('/register')} icon={LoginIcon}/>
        </div>
        }
      </div>
    </nav>
  );
};
