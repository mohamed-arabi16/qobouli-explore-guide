import React from 'react';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import ErrorBoundary from './ErrorBoundary';

function ProblemChild(): JSX.Element {
  throw new Error('Oops');
}

describe('ErrorBoundary', () => {
  it('renders fallback UI when child throws', () => {
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
  });
});
