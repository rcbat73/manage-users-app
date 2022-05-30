import Icon from "./Icon";

const SearchIcon = ({
  lineColor = "white",
  lineWidth = 5,
  height,
  fillColor = "transparent",
}) => (
  <Icon viewBox="0 0 60 60" height={height}>
    <circle
      cx="28"
      cy="27"
      r="15"
      fill={fillColor}
      stroke={lineColor}
      strokeWidth={lineWidth}
    />
    <line
      x1="38.6"
      x2="50.4"
      y1="37.6"
      y2="49.5"
      stroke={lineColor}
      strokeWidth={lineWidth}
    />
  </Icon>
);

export default SearchIcon;
