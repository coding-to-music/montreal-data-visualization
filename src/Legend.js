import React from "react";
import styles from "./Legend.module.css";
import colorNames from "./colorNames.js";
import colors from "./colors.js";

export default function Legend(props) {
  const { target, range } = props;
  const bins = [
    ...[
      ...range.sort((a, b) => b - a).map((value) => 1 + value),

      1,
      ...range.sort((a, b) => b - a).map((value) => 1 - value),
      0,
    ],
  ].map((value) => value * target);
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
