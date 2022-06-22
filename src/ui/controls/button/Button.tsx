import { ButtonHTMLAttributes } from "react"

import styles from './Button.module.scss';

interface props extends ButtonHTMLAttributes<HTMLButtonElement> {
    colorScheme: "primary" | "secondary";
}

export const Button: React.FC<props> = ({colorScheme = "secondary", children, ...props}) => {
  return (
    <button className={`${styles.container} ${styles[colorScheme]}`} {...props}>{children}</button>
  )
}
