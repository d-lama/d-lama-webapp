import React from 'react';
import { render, screen } from '@testing-library/react';
import Registration from "./Registration";

test('renders Registration without crashing', () => {
    const { baseElement } = render(<Registration />);
    expect(baseElement).toBeDefined();
});

test('renders without crashing', () => {
    const { baseElement } = render(<Registration />);
    expect(baseElement).toBeDefined();
});


describe('Registration component', () => {
    test('renders registration form', () => {
        render(<Registration />);
        const formElement = screen.getByTestId('registration-form');
        expect(formElement).toBeInTheDocument();
    });

});
