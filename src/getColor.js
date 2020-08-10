import colors from "./colors.js";
import colorNames from "./colorNames.js";

const target = 400000;
const range = [0.05, 0.15, 0.3];

const bins = [
  ...[
    ...range.sort((a, b) => b - a).map((value) => 1 + value),

    1,
    ...range.sort((a, b) => b - a).map((value) => 1 - value),
    0,
  ],
].map((value) => value * target);

const getBin = (value) => Math.max(...bins.filter((bin) => value >= bin));
const getColor = (value) =>
  colors[colorNames[bins.indexOf(getBin(value))]]
    .replace("rgb(", "")
    .replace(")", "")
    .split(",")
    .map((value) => +value);

export default getColor;
