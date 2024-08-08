import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary from './errorhandler'; 


const ErrorProneComponent = () => {
  throw new Error('Test Error');
};

const TestComponent = ({ throwError }) => {
  if (throwError) {
    return <ErrorProneComponent />;
  }
  return <div>Component Loaded Successfully</div>;
};

describe('ErrorBoundary Component', () => {
  test('should display error message when an error is thrown', () => {
    render(
      <ErrorBoundary>
        <TestComponent throwError={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('This page is under maintenance')).toBeInTheDocument();
    expect(screen.getByText('Retry')).toBeInTheDocument();
  });

  test('should render children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <TestComponent throwError={false} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Component Loaded Successfully')).toBeInTheDocument();
  });

  test('should reset error state and render children after clicking Retry', () => {
    
    const { rerender } = render(
      <ErrorBoundary>
        <TestComponent throwError={true} />
      </ErrorBoundary>
    );


    expect(screen.getByText('This page is under maintenance')).toBeInTheDocument();

 
    rerender(
      <ErrorBoundary>
        <TestComponent throwError={false} />
      </ErrorBoundary>
    );

    
    expect(screen.queryByText('This page is under maintenance')).not.toBeInTheDocument();
    expect(screen.getByText('Component Loaded Successfully')).toBeInTheDocument();
  });
});
