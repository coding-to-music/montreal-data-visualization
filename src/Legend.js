import React from "react";
import styles from "./Legend.module.css";
import colorNames from "./colorNames.js";
import colors from "./colors.js";
import useGetBins from "./useGetBins";

export default function Legend(props) {
  const { target, range, handleSetSettingsOpen } = props;
  const { bins } = useGetBins(target, range);
  return (
    <div className={styles.legend}>
      <div className={styles.legendTitle}>Assessments</div>
      <div></div>
      <div className={styles.legendContainer}>
        <div className={styles.legendPalette}>
          {colorNames.map((name, index) => {
            return (
              <div
                key={index}
                className={styles.legendColor}
                style={{ background: colors[name] }}
              >
                {""}
              </div>
            );
          })}
        </div>
        <div className={styles.legendRange}>
          {bins.map((value, index) =>
            index !== bins.length - 1 ? (
              <div className={styles.legendValue} key={index}>
                {value === target ? (
                  <div
                    className={styles.legendTarget}
                    onClick={() => handleSetSettingsOpen()}
                  >
                    ${(value / 1000).toFixed(0)}k
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="18"
                      viewBox="0 0 18 18"
                      width="18"
                    >
                      <defs></defs>
                      <rect id="Canvas" opacity="0" width="18" height="18" />
                      <path
                        className="a"
                        d="M10.227,4,2.542,11.686a.496.496,0,0,0-.1255.2105L1.0275,16.55c-.057.188.2295.425.3915.425a.15587.15587,0,0,0,.031-.003c.138-.032,3.9335-1.172,4.6555-1.389a.492.492,0,0,0,.2075-.125L14,7.772ZM5.7,14.658c-1.0805.3245-2.431.7325-3.3645,1.011L3.34,12.304Z"
                      />
                      <path
                        className="a"
                        d="M16.7835,4.1,13.9,1.216a.60751.60751,0,0,0-.433-.1765H13.45a.686.686,0,0,0-.4635.2035l-2.05,2.05L14.708,7.0645l2.05-2.05a.686.686,0,0,0,.2-.4415A.612.612,0,0,0,16.7835,4.1Z"
                      />
                    </svg>
                  </div>
                ) : (
                  "$" + (value / 1000).toFixed(0) + "k"
                )}
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}
