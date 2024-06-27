import React from 'react';

interface IErrorBoundaryState {
  error?: string | null | Error;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errorInfo?: any;
}

interface IErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  componentDidCatch(error: Error, errorInfo: any) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    console.log('componentDidCatch: -> error:', error);
    console.log('componentDidCatch -> errorInfo: ', errorInfo);
    // You can also log error messages to an error reporting service here
  }

  render() {
    const { error, errorInfo } = this.state;
    if (errorInfo) {
      // Error path
      return (
        <div>
          <h2>出现了一些问题.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {error?.toString() ?? error}
            <br />
            {errorInfo.componentStack}
          </details>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}
export default ErrorBoundary;
