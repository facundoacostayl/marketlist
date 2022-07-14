import styles from './FinishButton.module.scss';
import {FontAwesomeIcon, FinishIcon} from '../icons';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onOpenModal: VoidFunction
}

export const FinishButton:React.FC<Props> = ({onOpenModal}) => {
  return (
    <button onClick={onOpenModal} className={`${styles.container}`} type="submit">
        <FontAwesomeIcon className={`${styles.icon}`} icon={FinishIcon}/>
        <p>Ingresar Total</p>
    </button>
  )
}
