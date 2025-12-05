import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
          {/* eslint-disable-next-line i18next/no-literal-string */}
          <h1 className="text-2xl font-semibold mb-2">Something went wrong.</h1>
          {/* eslint-disable-next-line i18next/no-literal-string */}
          <p className="text-muted-foreground">Please refresh the page or try again later.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
