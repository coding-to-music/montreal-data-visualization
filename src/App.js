import React, { useState } from "react";
import styles from "./App.module.css";
import * as Locations from "./locations";
import Map from "./Map";
import { FlyToInterpolator } from "react-map-gl";
import Legend from "./Legend";

function App() {
  const [target] = useState(400000);
  const [range] = useState([0.05, 0.15, 0.3]);
  const [viewState, setViewState] = useState(Locations.Montreal);
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
        {Object.keys(Locations).map((key) => {
          return (
            <button key={key} onClick={() => handleFlyTo(Locations[key])}>
              {key}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default App;
