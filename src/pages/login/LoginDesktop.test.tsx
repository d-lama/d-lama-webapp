import { render } from "@testing-library/react";
import LoginDesktop from "./LoginDesktop";

test("renders without crashing", () => {
  const { baseElement } = render(<LoginDesktop />);
  expect(baseElement).toBeDefined();
});
