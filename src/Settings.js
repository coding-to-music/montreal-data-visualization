import React from "react";
import styles from "./Settings.module.css";

const Settings = React.forwardRef((props, ref) => {
  const { isModalOpen } = props;
  return (
    <React.Fragment>
      {isModalOpen ? (
        <div ref={ref} className={styles.modal}>
          Click anywhere outside to close.
        </div>
      ) : null}
    </React.Fragment>
  );
});

export default Settings;
