import { useState, useEffect } from "react";
import { dataMapper } from "../utils/utils";

const useRequest = (query) => {
  const [state, setState] = useState({
    isLoading: false,
    error: "",
    data: null,
  });

  useEffect(() => {
    let mount = true;
    const stateCallback = (data, isLoading, error) => (prev) => ({
      data,
      isLoading,
      error,
    });
    const fetchData = async () => {
      setState(stateCallback(null, true, ""));
      try {
        const response = await fetch(
          `${process.env.REACT_APP_USER_URL}/${query}`
        );
        const data = await response.json();
        if (!response.ok) {
          throw Error(response.status);
        }
        if (mount) {
          setState(stateCallback(dataMapper(data), false, ""));
        }
      } catch (error) {
        if (mount) {
          setState(stateCallback(null, false, error.message));
        }
        console.log(error.message);
      }
    };
    if (mount && query) {
      fetchData();
    }

    return () => {
      mount = false;
    };
  }, [query]);
  return { ...state };
};

export default useRequest;
