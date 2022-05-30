import React from "react";
import { customRender, screen } from "../../utils/test";
import * as Router from "react-router";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";

import User from "./User";
import useRequest from "../../hooks/useRequest";

const reposMock = [
  { name: "repo1", description: "Repo 1" },
  { name: "repo2", description: "Repo 2" },
];

jest.mock("../../hooks/useRequest");

describe("User component", () => {
  const userData = {
    state: {
      login: "coco",
      name: "coco playa",
      picture: "https://avatars.githubusercontent.com/u/8480969?v=4",
      alt: "Avatar of user coco",
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Router, "useLocation").mockImplementation(() => userData);
  });

  it("shows a user without repos", async () => {
    const { login, name, picture, alt } = userData.state;
    useRequest.mockReturnValue({
      isLoading: false,
      data: [],
      error: "",
    });
    customRender(<User {...userData.state} />);
    const imgElement = await screen.findByRole("img");
    expect(imgElement.getAttribute("src")).toMatch(picture);
    expect(imgElement.getAttribute("alt")).toMatch(alt);
    expect(screen.getByLabelText("Search a new user")).toBeInTheDocument();
    expect(screen.getByText(`User ${login}`)).toBeInTheDocument();
    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByTestId("repos-amount")).toHaveTextContent(0);
    expect(screen.getByText("Repos amount:")).toBeInTheDocument();
    expect(screen.getByText("Repos")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem").length).toBe(1);
  });

  it("shows a user with repos", async () => {
    useRequest.mockReturnValue({
      isLoading: false,
      data: reposMock,
      error: "",
    });
    customRender(<User {...userData.state} />);
    expect(screen.getByTestId("repos-amount")).toHaveTextContent(2);
    expect(screen.getAllByRole("listitem").length).toBe(3);
  });

  it("returns to search user page if the user click on the button on the top left corner", async () => {
    useRequest.mockReturnValue({
      isLoading: false,
      data: reposMock,
      error: "",
    });
    const history = createMemoryHistory();

    customRender(<User {...userData.state} />, {
      initialRoutes: ["/user"],
    });

    await userEvent.click(screen.getByLabelText("Search a new user"));
    expect(history.location.pathname).toBe("/");
  });
});
