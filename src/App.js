import React, { useState, useRef } from "react";
import styles from "./App.module.css";
import Map from "./Map";
import { FlyToInterpolator } from "react-map-gl";
import Legend from "./Legend";
import useOnClickOutside from "./useOnClickOutside";
import Settings from "./Settings";
import useGetViewport from "./useGetViewport";

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
  const ref = useRef();
  const [target] = useState(300000);
  const [range] = useState([0.05, 0.15, 0.3]);
  const [viewState, setViewState] = useState(locations.Montreal);
  const [isModalOpen, setModalOpen] = useState(false);

  useOnClickOutside(ref, () => setModalOpen(false));
  const handleSetModalOpen = () => {
    setModalOpen(true);
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

  return (
    <div>
      <Map
        width="100vw"
        height="100vh"
        viewState={viewState}
        onViewStateChange={handleChangeViewState}
        target={target}
        range={range}
      />
      <Legend
        target={target}
        range={range}
        handleSetModalOpen={handleSetModalOpen}
      />
      <Settings isModalOpen={isModalOpen} ref={ref} />
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
