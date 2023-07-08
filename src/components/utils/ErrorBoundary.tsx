import React, { ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  fallback: ReactNode;
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    logErrorToMyService(error, info.componentStack);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
function logErrorToMyService(error: Error, componentStack: string) {
  console.log("Erro:");
  console.log(error);
  console.log("ComponentStack:");
  console.log(componentStack);
  throw new Error('Function not implemented.');
}

