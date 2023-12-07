import React from "react";
import { render } from "@testing-library/react";
import App from "../src/App";

jest.mock("react-router-dom");

describe("App.tsx", () => {
  it("renderiza App de forma correcta", () => {
    const container = render(<App />);

    expect(container).not.toBeNull();
  });
});
