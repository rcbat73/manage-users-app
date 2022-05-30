import React from "react";
import { customRender } from "../../utils/test";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as Router from "react-router";

import Search from "./Search";
import * as hook from "../../hooks/useRequest";

const userMock = {
  login: "coco",
  name: "coco",
  picture: "https://avatars.githubusercontent.com/u/8480969?v=4",
  alt: "Avatar of user coco",
};

describe("Search component", () => {
  const navigate = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Router, "useNavigate").mockImplementation(() => navigate);
  });

  it("renders an h1 tag and a form with an input field and a button", async () => {
    jest.spyOn(hook, "default").mockImplementation(() => ({
      isLoading: false,
      data: null,
      error: "",
    }));
    customRender(<Search />);
    expect(screen.getByText("Users search")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Form for searching a user")
    ).toBeInTheDocument();
    expect(screen.getByLabelText("User login")).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
  });

  it("shows a spinner on the left of the button", async () => {
    jest.spyOn(hook, "default").mockImplementation(() => ({
      isLoading: true,
      data: null,
      error: "",
    }));

    customRender(<Search />);

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("does not show the spinner", async () => {
    jest.spyOn(hook, "default").mockImplementation(() => ({
      isLoading: false,
      data: null,
      error: "",
    }));

    customRender(<Search />);

    expect(screen.queryByTestId("spinner")).toBeNull();
  });

  it("show an alert message if there was an error", async () => {
    const errorMessage = "Fail to fetch";
    jest.spyOn(hook, "default").mockImplementation(() => ({
      isLoading: false,
      data: null,
      error: errorMessage,
    }));

    customRender(<Search />);

    const alert = await screen.findByText(errorMessage);

    expect(alert).toBeInTheDocument();
  });

  it("calls navigate function for going to user route", async () => {
    jest.spyOn(hook, "default").mockImplementation(() => ({
      isLoading: false,
      data: userMock,
      error: "",
    }));
    customRender(<Search />);
    await userEvent.type(screen.getByRole("textbox"), "coco");
    await userEvent.click(screen.getByText("Search"));
    expect(navigate).toHaveBeenCalledWith("/user", { state: userMock });
  });

  it("does not call navigate function and shows a warning", async () => {
    const warningMessage = "The input value cannot be empty";
    jest.spyOn(hook, "default").mockImplementation(() => ({
      isLoading: false,
      data: null,
      error: "",
    }));
    customRender(<Search />);
    await userEvent.type(screen.getByRole("textbox"), " ");
    await userEvent.click(screen.getByText("Search"));
    expect(navigate).not.toHaveBeenCalled();
    const alert = await screen.findByText(warningMessage);
    expect(alert).toBeInTheDocument();
  });
});
