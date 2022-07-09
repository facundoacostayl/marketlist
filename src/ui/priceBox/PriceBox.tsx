import styles from "./PriceBox.module.scss";

type Props = {
  ARS: number;
  USD: number;
};

export const PriceBox: React.FC = ({ children }, { ARS = 0, USD = 0 }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.arsSide}>
        <i>
          <img src={require("../../img/argentinaflag.webp")} alt="argentina" />
        </i>
        <p>
          {new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS",
          }).format(ARS)}
        </p>
      </div>
      <div className={styles.usdSide}>
        <i>
          <img src={require("../../img/usaflag.webp")} alt="usa" />
        </i>
        <p>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(USD)}
        </p>
      </div>
    </div>
  );
};
