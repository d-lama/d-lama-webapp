import { RenderResult, render, screen } from "@testing-library/react";
import { ProjectButton } from "./ProjectButton";

describe("ProjectButton", () => {
  const defaultProps = {
    title: "Project Title",
    progress: 50,
  };

  test("renders without crashing", () => {
    render(<ProjectButton {...defaultProps} />);
  });

  let projectBtn: RenderResult<
    typeof import("@testing-library/dom/types/queries"),
    HTMLElement,
    HTMLElement
  >;

  beforeEach(() => {
    projectBtn = render(<ProjectButton {...defaultProps} />);
  });

  test("should render the button", () => {
    expect(projectBtn).toBeDefined();
  });

  test("should render the title", () => {
    const titleElement = screen.getByRole("title");
    expect(titleElement).toBeDefined();
    expect(titleElement).toHaveTextContent(defaultProps.title);
  });

  test("should render the progress", () => {
    const progressElement = screen.getByRole("progressbar");
    expect(progressElement).toBeDefined();
    expect(progressElement).toHaveStyle(`width: ${defaultProps.progress}%`);
  });
});
