import { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import styled from "styled-components";
import { Link } from "react-router-dom";
import useRequest from "../../hooks/useRequest";
import Repos from "../repos/Repos";
import SearchIcon from "../icons/SearchIcon";

const MainWrapper = styled("main")`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 20px 20px;
  row-gap: 20px;
  @media (min-width: 425px) {
    padding: 40px;
  }
`;

const Header = styled("header")`
  display: flex;
  justify-content: center;
  column-gap: 20px;
`;

const Picture = styled("img")`
  border-radius: 50%;
  width: 200px;
`;

const UserTextWrapper = styled("div")`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`;

const UserInfoWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 20px;
`;

const ReposWrapper = styled("div")`
  width: 100%;
`;

const StyledLink = styled(Link)`
  display: block;
  background: transparent;
  border: none;
  cursor: pointer;
  background-color: var(--summer-sky);
  border-radius: 50%;
  &:hover {
    box-shadow: 0px 0px 4px rgb(0 0 0 / 30%);
  }
  height: 30px;
  width: 30px;
`;

const User = ({ login, name, picture, alt }) => {
  const [currenRepos, setCurrenRepos] = useState([]);

  const alert = useAlert();

  const result = useRequest(`${login}/repos`);

  useEffect(() => {
    if (result.error) {
      alert.error(result.error);
    }
    setCurrenRepos(result.data || []);

    return () => {
      alert.removeAll();
    };
  }, [result.error, alert, result.data]);

  return (
    <MainWrapper>
      <StyledLink to={"/"} aria-label="Search a new user">
        <SearchIcon lineColor="white" />
      </StyledLink>
      <UserInfoWrapper>
        <h2>User {login}</h2>
        <Header>
          <Picture src={picture} alt={alt} />
          <UserTextWrapper>
            <p>
              <b>Name: </b>
              {name}
            </p>
            <p data-testid="repos-amount">
              <b>Repos amount: </b>
              {currenRepos.length}
            </p>
          </UserTextWrapper>
        </Header>
        <ReposWrapper>
          <h3>Repos</h3>
          {result.isLoading || <Repos repos={currenRepos} />}
        </ReposWrapper>
      </UserInfoWrapper>
    </MainWrapper>
  );
};

export default User;
