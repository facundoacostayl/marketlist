import styles from "./PriceBox.module.scss";

import {ListState} from '../../Item/types/interfaces';

type Props = {
  arsTotal: ListState["arsTotal"];
  usdTotal: ListState["usdTotal"];
};

export const PriceBox: React.FC<Props> = ({ children, arsTotal = 0, usdTotal = 0 }) => {
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
          }).format(arsTotal)}
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
          }).format(usdTotal)}
        </p>
      </div>
    </div>
  );
};
