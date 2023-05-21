import React from 'react';
import { render } from '@testing-library/react';
import RegistrationSucceedDesktop from "./RegistrationSucceedDesktop";

test('renders RegistrationSucceed without crashing', () => {
    const { baseElement } = render(<RegistrationSucceedDesktop />);
    expect(baseElement).toBeDefined();
});

test('renders without crashing', () => {
    const { baseElement } = render(<RegistrationSucceedDesktop />);
    expect(baseElement).toBeDefined();
});