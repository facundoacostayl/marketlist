import styles from './ModalFooter.module.scss';

export const ModalFooter: React.FC = ({children}) => {
  return (
    <footer className={styles.container}>
        {children}
    </footer>
  )
}
