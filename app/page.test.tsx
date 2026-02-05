import { render, screen } from '@testing-library/react';
import Home from './page';

describe('Home Page', () => {
  it('renders welcome heading', () => {
    render(<Home />);
    expect(screen.getByText('Welcome to Rolling Story')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<Home />);
    expect(screen.getByText(/Create and collaborate on novels/i)).toBeInTheDocument();
  });

  it('renders Start Writing button', () => {
    render(<Home />);
    const startButton = screen.getByText('Start Writing');
    expect(startButton).toBeInTheDocument();
    expect(startButton.closest('a')).toHaveAttribute('href', '/register');
  });

  it('renders Login button', () => {
    render(<Home />);
    const loginButton = screen.getByText('Login');
    expect(loginButton).toBeInTheDocument();
    expect(loginButton.closest('a')).toHaveAttribute('href', '/login');
  });
});
