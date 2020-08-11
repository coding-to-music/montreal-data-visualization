import React from "react";
import styles from "./Settings.module.css";

const Settings = React.forwardRef((props, ref) => {
  const { isSettingsOpen } = props;
  return (
    <React.Fragment>
      {isSettingsOpen ? (
        <div ref={ref} className={styles.modal}>
          <div>{props.children}</div>
        </div>
      ) : null}
    </React.Fragment>
  );
});

export default Settings;
