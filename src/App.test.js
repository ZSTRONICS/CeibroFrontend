import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  it('should render the app without errors', () => {
    render(<App />);
    const appElement = screen.getByTestId('app');
    expect(appElement).toBeInTheDocument();
  });

  it('should render the title correctly', () => {
    render(<App />);
    const titleElement = screen.getByText('Hello, World!');
    expect(titleElement).toBeInTheDocument();
  });

  it('should render the list of items correctly', () => {
    render(<App />);
    const items = screen.getAllByTestId('list-item');
    expect(items.length).toBe(3);
  });

  it('should handle button click correctly', () => {
    render(<App />);
    const buttonElement = screen.getByTestId('button');
    const messageElement = screen.getByTestId('message');
    
    expect(messageElement.textContent).toBe('Initial Message');

    userEvent.click(buttonElement);

    expect(messageElement.textContent).toBe('Button Clicked');
  });
});
