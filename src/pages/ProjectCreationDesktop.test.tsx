import React from 'react';
import { render } from '@testing-library/react';
import ProjectCreationDesktop from "./ProjectCreationDesktop";

test('renders ProjectCreationDesktop without crashing', () => {
    const { baseElement } = render(<ProjectCreationDesktop />);
    expect(baseElement).toBeDefined();
});

test('renders without crashing', () => {
    const { baseElement } = render(<ProjectCreationDesktop />);
    expect(baseElement).toBeDefined();
});