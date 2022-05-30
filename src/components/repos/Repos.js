import styled from "styled-components";

const ReposWrapper = styled("ul")`
  display: flex;
  flex-direction: column;
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const Row = styled("li")`
  display: flex;
  column-gap: 20px;
  justify-content: center;
  width: 100%;
  background-color: var(--alice-blue);
  margin: 2px 0;
  &:first-child {
    background-color: var(--black);
    color: var(--white);
    text-align: center;
    border-radius: 2px;
  }
`;

const Cell = styled("p")`
  margin: 4px 0;
  &:first-child {
    width: 20%;
  }
  width: 60%;
  @media (min-width: 425px) {
    width: 80%;
  }
`;

const Repos = ({ repos }) => (
  <ReposWrapper>
    <Row>
      <Cell>Name</Cell>
      <Cell>Description</Cell>
    </Row>
    {repos.map(({ description, name }) => (
      <Row key={name}>
        <Cell>{name}</Cell>
        <Cell>{description}</Cell>
      </Row>
    ))}
  </ReposWrapper>
);

export default Repos;
