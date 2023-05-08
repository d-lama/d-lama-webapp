import { render } from "@testing-library/react";
import RegistrationMobile from "./RegistrationMobile";
import React from "react";

test("renders without crashing", () => {
    const { baseElement } = render(<RegistrationMobile />);
    expect(baseElement).toBeDefined();
});