import colors from "./colors.js";
import colorNames from "./colorNames.js";

const target = 500000;
const range = [0.05, 0.15, 0.3];

const bins = [
  ...[
    ...range.map((value) => 1 - value),
    0,
    1,
    ...range.map((value) => 1 + value),
  ].sort(),
].map((value) => value * target);

const getBin = (value) => Math.max(...bins.filter((bin) => bin < value));
const getColor = (value) =>
  colors[colorNames[bins.indexOf(getBin(value))]]
    .replace("rgb(", "")
    .replace(")", "")
    .split(",")
    .map((value) => +value);

export default getColor;
