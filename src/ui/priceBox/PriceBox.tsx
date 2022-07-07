import styles from './PriceBox.module.scss';

type Props = {
    ARS: number,
    USD: number
}

export const PriceBox: React.FC = ({children}, {ARS, USD}: Props) => {
  return (
    <div className={styles.container}>
        <div className={styles.arsSide}>
            <i><img src={require("../../img/argentinaflag.webp")} alt="argentina"/></i>
            <p>${ARS}</p>
        </div>
        <div className={styles.usdSide}>
            <i><img src={require("../../img/usaflag.webp")} alt="usa"/></i>
            <p>${USD}</p>
        </div>
    </div>
  )
}
