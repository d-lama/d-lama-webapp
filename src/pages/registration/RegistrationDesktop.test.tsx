import { render } from "@testing-library/react";
import RegistrationDesktop from "./RegistrationDesktop";

test("renders without crashing", () => {
    const { baseElement } = render(<RegistrationDesktop />);
    expect(baseElement).toBeDefined();
});