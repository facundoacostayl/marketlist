import { InputHTMLAttributes } from "react"
import styles from './TextField.module.scss';

export const TextField: React.FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return (
    <input className={styles.input} {...props}/>
  )
}
