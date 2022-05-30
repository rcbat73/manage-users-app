import { transitions, positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};

const Providers = ({ children, initialRoutes }) => {
  return (
    <Provider template={AlertTemplate} {...options}>
      <MemoryRouter initialEntries={initialRoutes}>{children}</MemoryRouter>
    </Provider>
  );
};

export const customRender = (ui, options) =>
  render(ui, { wrapper: Providers, ...options });

export * from "@testing-library/react";
