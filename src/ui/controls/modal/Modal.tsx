import styles from './Modal.module.scss';

type props = {
    onClose: VoidFunction
}

export const Modal: React.FC<props> = ({children, onClose}) => {
  return (
    <section className={styles.container}>
        <b onClick={onClose}></b>
        <article>{children}</article>
    </section>
  )
}
