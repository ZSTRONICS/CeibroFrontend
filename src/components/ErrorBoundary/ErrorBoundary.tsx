import { Button } from "@mui/material";
import React, { Component, ReactNode, ErrorInfo } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorMessage: string | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null, errorMessage: null };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({
      hasError: true,
      error: error,
      errorInfo: info,
      errorMessage: this.extractErrorMessage(error),
    });

    const { onError } = this.props;
    if (onError && typeof onError === 'function') {
      onError(error, info);
    }

    // You can also log the error to an error reporting service
    console.error(error, info);
  }

  extractErrorMessage(error: Error): string | null {
    const stackTraceLines = error.stack?.split('\n');
    if (stackTraceLines && stackTraceLines.length > 1) {
      // Extract the file name from the second line of the stack trace
      const [, fileName] = stackTraceLines[1].trim().split(' ') || [];
      return fileName || null;
    }
    return null;
  }

  handleGoToHomePage = () => {
    // Navigate to the home page URL
    window.location.href = "/tasks";
  };

  render() {
    if (this.state.hasError) {
      // Render the actual error message
      return (
        <>
        <div style={{margin:'0 auto', padding:'1rem 2rem', fontFamily:'sans-serif', fontSize:'16px', fontWeight:'500'}}>
          <h3 style={{ textAlign: "center" }}>Something went wrong:</h3>
           <Button onClick={this.handleGoToHomePage}>Go to Home Page</Button>
          <p>Error: {this.state.error?.toString()}</p>
          <p>File Name: {this.state.errorMessage}</p>
          <p>Stacktrace: {this.state.errorInfo?.componentStack}</p>
        </div>
        </>
      );
    }
    return <>{this.props.children}</>;
  }
}
