import React from "react";
import styles from "./RangeInput.module.css";

export default function RangeInput(props) {
  const { range, handleSetRange } = props;
  return (
    <div className={styles.rangeInput}>
      <div className={styles.rangeLabel}>Range +/-</div>
      <div>
        <label
          className={
            range[0] === 0.3 ? styles.rangeRadioActive : styles.rangeRadio
          }
        >
          <input
            name="narrow"
            value="narrow"
            type="radio"
            onChange={handleSetRange}
            hidden
          />
          5, 15, 30%
        </label>
        <label
          className={
            range[0] === 0.5 ? styles.rangeRadioActive : styles.rangeRadio
          }
        >
          <input
            name="wide"
            value="wide"
            type="radio"
            onChange={handleSetRange}
            hidden
          />
          10, 25, 50%
        </label>
      </div>
    </div>
  );
}
