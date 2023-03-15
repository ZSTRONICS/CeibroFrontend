// @ts-nocheck
import React, { Component } from 'react';

export class ErrorBoundary extends Component {
  constructor(props:any) {
    super(props);
    this.state = { hasError: false };
  }
 
  componentDidCatch(error: any, info: any) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    console.log(error, info);
  }
 
  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (<>
      <h3 style={{textAlign:'center'}}>Something went wrong</h3>
      </>
      )
    }
    return this.props.children;
  }
}
