import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SpinnerWrapper = styled("div")`
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  animation: ${rotate} 1s linear infinite;
`;
const Spinner = ({ width, height }) => (
  <SpinnerContainer data-testid="spinner">
    <SpinnerWrapper width={width} height={height} />
  </SpinnerContainer>
);

export default Spinner;
