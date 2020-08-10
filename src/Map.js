import React from "react";
import MapGL from "react-map-gl";
import { DeckGL, MVTLayer } from "deck.gl";
import getAccessToken from "./getAccessToken.js";
import getColor from "./getColor.js";
import useGetBins from "./useGetBins";

export default function Map({
  width,
  height,
  viewState,
  onViewStateChange,
  target,
  range,
}) {
  const { bins } = useGetBins(target, range);
  const layers = [
    new MVTLayer({
      id: "values",
      data: `https://a.tiles.mapbox.com/v4/mappingmtl.anlfff5k/{z}/{x}/{y}.vector.pbf?access_token=${getAccessToken()}`,
      getFillColor: (d) => getColor(d.properties.price, bins),
      getLineWidth: 1,
      lineWidthUnits: "pixels",
      pickable: true,
      autoHighlight: true,
      uniqueIdProperty: "id",
      onClick: (info) => console.log(info.object.properties),
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
