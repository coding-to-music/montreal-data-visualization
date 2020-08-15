import React, { useState, useRef } from "react";
import styles from "./App.module.css";
import Map from "./Map";
import { FlyToInterpolator } from "react-map-gl";
import Legend from "./Legend";
import useOnClickOutside from "./useOnClickOutside";
import Settings from "./Settings";
import useGetViewport from "./useGetViewport";
import Popup from "./Popup";
import PriceInput from "./PriceInput";
import useGetBins from "./useGetBins";

function App() {
  const { width, height } = useGetViewport();
  const base = width > height ? height : width;
  const zoom = 0.001713395638629284 * base + 8.607476635514018;
  const locations = {
    Montreal: {
      longitude: -73.725,
      latitude: 45.55,
      zoom: zoom,
      pitch: 0,
      bearing: 0,
    },
  };
  const settingsRef = useRef();
  const popupRef = useRef();
  const [target, setTarget] = useState(500000);
  const [range, setRange] = useState([0.05, 0.15, 0.3]);
  const { bins } = useGetBins(target, range);
  const [viewState, setViewState] = useState(locations.Montreal);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [popupContents, setPopupContents] = useState();

  useOnClickOutside(settingsRef, () => setSettingsOpen(false));
  useOnClickOutside(popupRef, () => setPopupOpen(false));

  const handleSetSettingsOpen = () => {
    setSettingsOpen(true);
  };
  const handleSetPopupOpen = (info) => {
    setPopupContents(info);
    setPopupOpen(true);
  };

  const handleChangeViewState = ({ viewState }) => setViewState(viewState);
  const handleFlyTo = (destination) => {
    setViewState({
      ...viewState,
      ...destination,
      transitionDuration: 2000,
      transitionInterpolator: new FlyToInterpolator(),
    });
  };

  const handleSetTarget = (event) => {
    const value = event.currentTarget.value;
    setTarget(value);
    window.scrollTo(0, 0);
    console.log(range);
  };

  return (
    <div>
      <Map
        width="100vw"
        height="100vh"
        viewState={viewState}
        onViewStateChange={handleChangeViewState}
        target={target}
        range={range}
        handleSetPopupOpen={handleSetPopupOpen}
        bins={bins}
      />
      <Popup
        isPopupOpen={isPopupOpen}
        ref={popupRef}
        popupContents={popupContents}
      />
      <Legend
        target={target}
        range={range}
        handleSetSettingsOpen={handleSetSettingsOpen}
      />
      <Settings isSettingsOpen={isSettingsOpen} ref={settingsRef}>
        <PriceInput target={target} handleSetTarget={handleSetTarget} />
      </Settings>
      <div className={styles.controls}>
        {Object.keys(locations).map((key) => {
          return (
            <button key={key} onClick={() => handleFlyTo(locations[key])}>
              {key}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default App;
