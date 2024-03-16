import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../src/app/page";

describe("Home", () => {
  it("should render Home", () => {
    render(<Home />);

    const heading = screen.getByRole("heading");

    expect(heading).toBeInTheDocument();
  });
});
