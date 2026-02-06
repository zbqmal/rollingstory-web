import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import { useAuth } from '@/lib/use-auth';

jest.mock('@/lib/use-auth');

describe('Header', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the app title', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      isAuthenticated: false,
      logout: jest.fn(),
    });

    render(<Header />);
    expect(screen.getByText('Rolling Story')).toBeInTheDocument();
  });

  it('renders login and sign up links when not authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      isAuthenticated: false,
      logout: jest.fn(),
    });

    render(<Header />);
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  it('has correct link hrefs when not authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      isAuthenticated: false,
      logout: jest.fn(),
    });

    render(<Header />);
    const loginLink = screen.getByText('Login').closest('a');
    const signUpLink = screen.getByText('Sign Up').closest('a');
    
    expect(loginLink).toHaveAttribute('href', '/login');
    expect(signUpLink).toHaveAttribute('href', '/register');
  });

  it('displays username when authenticated', () => {
    const mockUser = { id: '1', email: 'test@test.com', username: 'testuser', createdAt: '2024-01-01' };
    (useAuth as jest.Mock).mockReturnValue({
      user: mockUser,
      isAuthenticated: true,
      logout: jest.fn(),
    });

    render(<Header />);
    expect(screen.getByText('Hello, testuser')).toBeInTheDocument();
  });

  it('displays logout button when authenticated', () => {
    const mockUser = { id: '1', email: 'test@test.com', username: 'testuser', createdAt: '2024-01-01' };
    (useAuth as jest.Mock).mockReturnValue({
      user: mockUser,
      isAuthenticated: true,
      logout: jest.fn(),
    });

    render(<Header />);
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('calls logout when logout button clicked', () => {
    const mockLogout = jest.fn();
    const mockUser = { id: '1', email: 'test@test.com', username: 'testuser', createdAt: '2024-01-01' };
    (useAuth as jest.Mock).mockReturnValue({
      user: mockUser,
      isAuthenticated: true,
      logout: mockLogout,
    });

    render(<Header />);
    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);
    expect(mockLogout).toHaveBeenCalled();
  });

  it('does not show login/signup when authenticated', () => {
    const mockUser = { id: '1', email: 'test@test.com', username: 'testuser', createdAt: '2024-01-01' };
    (useAuth as jest.Mock).mockReturnValue({
      user: mockUser,
      isAuthenticated: true,
      logout: jest.fn(),
    });

    render(<Header />);
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
    expect(screen.queryByText('Sign Up')).not.toBeInTheDocument();
  });
});
