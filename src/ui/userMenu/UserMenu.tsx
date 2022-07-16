import styles from "./UserMenu.module.scss";

import {FontAwesomeIcon, LoginIcon, faList} from '../icons';
import {useAuth} from '../../Auth/context/AuthProvider';
import {useNavigate} from 'react-router-dom';

export const UserMenu = () => {

  const {onSignOut} = useAuth();
  const navigate = useNavigate();

  const signOutHandler = () => {
    try {
      onSignOut();
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <b className={`${styles.backdrop}`}></b>
      <div className={`${styles.container}`}>
        <ul>
          <li onClick={() => navigate('/mis-listas')}>
            <FontAwesomeIcon icon={faList}/>
            Mis Listas
            </li>
          <li onClick={() => signOutHandler()}>
            <FontAwesomeIcon icon={LoginIcon}/>
            Cerrar Sesión
            </li>
        </ul>
      </div>
    </>
  );
};
