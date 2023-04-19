import React from 'react';
import { render } from '@testing-library/react';
import ExploreContainer from './ExploreContainer';

test('renders ExploreContainer without crashing', () => {
  const { baseElement } = render(<ExploreContainer />);
  expect(baseElement).toBeDefined();
});

test('renders without crashing', () => {
  const { baseElement } = render(<ExploreContainer />);
  expect(baseElement).toBeDefined();
});