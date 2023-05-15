import React from 'react';
import { render } from '@testing-library/react';
import RegistrationSucceedMobile from "./RegistrationSucceedMobile";

test('renders RegistrationSucceed without crashing', () => {
    const { baseElement } = render(<RegistrationSucceedMobile />);
    expect(baseElement).toBeDefined();
});

test('renders without crashing', () => {
    const { baseElement } = render(<RegistrationSucceedMobile />);
    expect(baseElement).toBeDefined();
});