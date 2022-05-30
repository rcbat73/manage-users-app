import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import Spinner from "../spinner/Spinner";
import useRequest from "../../hooks/useRequest";

const MainWrapper = styled("main")`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 40px;
  row-gap: 20px;
`;

const StyledTitle = styled("h1")`
  text-align: center;
`;

const StyledForm = styled("form")`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 10px;
  height: 30px;
`;

const StyledInput = styled("input")`
  height: 25px;
`;

const StyledButton = styled("button")`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 10px;
  border: none;
  background-color: var(--summer-sky);
  border-radius: 3px;
  color: var(--white);
  padding: 5px 12px;
  &:hover {
    box-shadow: 0px 0px 4px rgb(0 0 0 / 30%);
  }
  height: 100%;
  width: 100px;
`;

const Search = () => {
  const [query, setQuery] = useState("");

  const inputRef = useRef("");
  const alertRef = useRef(null);

  let navigate = useNavigate();

  const alert = useAlert();

  const result = useRequest(query);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const value = inputRef.current.value.trim();
    if (value) {
      setQuery(value);
      return;
    }
    alert.remove(alertRef.current);
    alertRef.current = alert.info("The input value cannot be empty");
  };

  useEffect(() => {
    if (result.error) {
      alertRef.current = alert.error(result.error);
    } else if (result.data) {
      navigate("/user", { state: result.data });
    }
    return () => {
      alert.removeAll();
    };
  }, [result.data, result.error, alert, navigate]);

  return (
    <MainWrapper>
      <StyledTitle>Users search</StyledTitle>
      <StyledForm
        onSubmit={onSubmitHandler}
        aria-label="Form for searching a user"
      >
        <StyledInput ref={inputRef} aria-label="User login" />
        <StyledButton>
          Search
          {result.isLoading && <Spinner width="12" height="12" />}
        </StyledButton>
      </StyledForm>
    </MainWrapper>
  );
};

export default Search;
