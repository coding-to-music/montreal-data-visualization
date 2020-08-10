import React, { useState } from "react";
import styles from "./App.module.css";
import Map from "./Map";
import { FlyToInterpolator } from "react-map-gl";
import Legend from "./Legend";

const locations = {
  montreal: {
    longitude: -73.7,
    latitude: 45.55,
    zoom: 11,
    pitch: 0,
    bearing: 0,
  },
};

function App() {
  const [target] = useState(400000);
  const [range] = useState([0.05, 0.15, 0.3]);
  const [viewState, setViewState] = useState(locations.montreal);
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
      />
      <Legend target={target} range={range} />
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
