import React, { useState } from "react";
import styles from "./App.module.css";
import Map from "./Map";
import { FlyToInterpolator } from "react-map-gl";
import Legend from "./Legend";

function App() {
  const locations = {
    Montreal: {
      longitude: -73.65,
      latitude: 45.53,
      zoom: 11,
      pitch: 0,
      bearing: 0,
    },
  };
  const [target] = useState(300000);
  const [range] = useState([0.05, 0.15, 0.3]);
  const [viewState, setViewState] = useState(locations.Montreal);
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
