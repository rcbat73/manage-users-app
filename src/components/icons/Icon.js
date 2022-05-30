import styled from "styled-components";

const Icon = styled("svg")`
  position: relative;
  height: ${({ height = "24px" }) => height};
  fill: ${({ color = "black" }) => color};
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: -2px;
`;

export default Icon;
