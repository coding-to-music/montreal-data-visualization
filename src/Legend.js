import React from "react";
import styles from "./Legend.module.css";
import colorNames from "./colorNames.js";
import colors from "./colors.js";
import useGetBins from "./useGetBins";

export default function Legend(props) {
  const { target, range } = props;
  const { bins } = useGetBins(target, range);
  return (
    <div className={styles.legend}>
      {colorNames.map((name, index) => {
        return (
          <div className={styles.legendEntry} key={index}>
            <div
              className={styles.legendColor}
              style={{ background: colors[name] }}
            >
              {" "}
            </div>
            <div className={styles.legendLabel}>
              ${(bins[index] / 1000).toFixed(0)}k
            </div>
          </div>
        );
      })}
    </div>
  );
}
