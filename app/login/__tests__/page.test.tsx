import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import LoginPage from '../page';
import { useAuth } from '@/lib/use-auth';

jest.mock('next/navigation');
jest.mock('@/lib/use-auth');

describe('LoginPage', () => {
  const mockPush = jest.fn();
  const mockLogin = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
      isLoading: false,
      error: null,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders login form', () => {
    render(<LoginPage />);
    expect(screen.getByText('Welcome Back')).toBeInTheDocument();
    expect(screen.getByLabelText('Email or Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('shows validation error when credential is empty', async () => {
    render(<LoginPage />);
    
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitFor(() => {
      expect(screen.getByText('Email or username required')).toBeInTheDocument();
    });
  });

  it('shows validation error when password is empty', async () => {
    render(<LoginPage />);
    
    const credInput = screen.getByLabelText('Email or Username');
    fireEvent.change(credInput, { target: { value: 'test' } });
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitFor(() => {
      expect(screen.getByText('Password required')).toBeInTheDocument();
    });
  });

  it('submits form with valid data', async () => {
    mockLogin.mockResolvedValue({});
    render(<LoginPage />);
    
    const credInput = screen.getByLabelText('Email or Username');
    const passInput = screen.getByLabelText('Password');
    
    fireEvent.change(credInput, { target: { value: 'testuser' } });
    fireEvent.change(passInput, { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('testuser', 'password123');
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });

  it('displays loading state', () => {
    (useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
      isLoading: true,
      error: null,
    });

    render(<LoginPage />);
    expect(screen.getByRole('button', { name: 'Logging in...' })).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('displays error message', () => {
    (useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
      isLoading: false,
      error: 'Invalid credentials',
    });

    render(<LoginPage />);
    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
  });

  it('has link to register page', () => {
    render(<LoginPage />);
    const link = screen.getByText('Sign up');
    expect(link).toHaveAttribute('href', '/register');
  });
});
