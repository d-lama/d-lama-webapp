import React from 'react';
import { render } from '@testing-library/react';
import RegistrationSucceed from "./RegistrationSucceed";

test('renders RegistrationSucceed without crashing', () => {
    const { baseElement } = render(<RegistrationSucceed />);
    expect(baseElement).toBeDefined();
});

test('renders without crashing', () => {
    const { baseElement } = render(<RegistrationSucceed />);
    expect(baseElement).toBeDefined();
});