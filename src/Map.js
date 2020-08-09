import React from "react";
import MapGL from "react-map-gl";
import { DeckGL, MVTLayer } from "deck.gl";
import getAccessToken from "./getAccessToken.js";
import getColor from "./getColor.js";

export default function Map({ width, height, viewState, onViewStateChange }) {
  const layers = [
    new MVTLayer({
      id: "values",
      data: `https://a.tiles.mapbox.com/v4/mappingmtl.anlfff5k/{z}/{x}/{y}.vector.pbf?access_token=${getAccessToken()}`,
      uniqueIdProperty: (d) => d.object.properties.id,
      getFillColor: (d) => getColor(d.properties.price),
      pickable: true,
      autoHighlight: true,
      onClick: (info) => console.log(info.object.properties.id),
    }),
  ];

  return (
    <div>
      <MapGL
        width={width}
        height={height}
        viewState={viewState}
        onViewStateChange={onViewStateChange}
      >
        <DeckGL
          viewState={viewState}
          layers={layers}
          getTooltip={({ object }) =>
            object && {
              html: `<div>${
                object.properties.address
              }</div><div>$${object.properties.price.toLocaleString()}</div>`,
            }
          }
        />
      </MapGL>
    </div>
  );
}
