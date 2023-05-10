import { render, screen } from "@testing-library/react";
import LoginMobile from "./LoginMobile";

test("renders without crashing", () => {
  const { baseElement } = render(<LoginMobile />);
  expect(baseElement).toBeDefined();
});
