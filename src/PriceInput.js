import React from "react";
import styles from "./PriceInput.module.css";

export default function PriceInput(props) {
  return (
    <div className={styles.priceInput}>
      <div className={styles.priceLabel}>Target Price</div>
      <span>
        $
        <input
          type="number"
          step="10000"
          value={props.target}
          onChange={props.handleSetTarget}
        ></input>
      </span>
    </div>
  );
}
