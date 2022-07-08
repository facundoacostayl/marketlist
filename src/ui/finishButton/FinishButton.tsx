import styles from './FinishButton.module.scss';
import {FontAwesomeIcon, FinishIcon} from '../icons';

export const FinishButton:React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = () => {
  return (
    <button className={`${styles.container}`} type="submit">
        <FontAwesomeIcon className={`${styles.icon}`} icon={FinishIcon}/>
        <p>Ingresar Total</p>
    </button>
  )
}
