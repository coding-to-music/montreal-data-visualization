import React from "react";
import styles from "./Popup.module.css";

const Popup = React.forwardRef((props, ref) => {
  const { isPopupOpen, popupContents } = props;
  return (
    <React.Fragment>
      {isPopupOpen ? (
        <div ref={ref} className={styles.popup}>
          <div className={styles.popupContents}>
            <div className={styles.popupEntry}>{popupContents.address}</div>
            <div className={styles.popupEntry}>
              Registration: {popupContents.id}
            </div>
            <div className={styles.popupEntry}>
              ${popupContents.price.toLocaleString("en-US")}
            </div>
            <div className={styles.popupEntry}>
              {(+(popupContents.area * 10.7639104167).toFixed(
                0
              )).toLocaleString("en-US")}{" "}
              sf
            </div>
            <div className={styles.popupEntry}>
              {`$${popupContents.psqft.toLocaleString("en-US")} /sf`}
            </div>
            <div className={styles.popupEntry}>
              <a
                href={`https://maps.google.com/maps?q=${popupContents.address.replace(
                  / /g,
                  "+"
                )}+Montreal`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Streetview
              </a>
            </div>
            <div className={styles.popupEntry}>
              <a
                href={
                  "https://servicesenligne2.ville.montreal.qc.ca/sel/evalweb/index"
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                Property Tax Records
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
});

export default Popup;
