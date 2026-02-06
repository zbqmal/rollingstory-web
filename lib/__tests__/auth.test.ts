import { auth } from '../auth';
import { api } from '../api';

jest.mock('../api');

describe('auth', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    // Reset the auth state manually
    auth.o();
  });

  it('initializes with no user when no token stored', async () => {
    const initialState = auth.g();
    expect(initialState.u).toBeNull();
  });

  it('registers new user successfully', async () => {
    const mockResponse = {
      user: { id: '1', email: 'new@test.com', username: 'newuser', createdAt: '2024-01-01' },
      token: 'new-token'
    };
    (api.register as jest.Mock).mockResolvedValue(mockResponse);

    await auth.r('new@test.com', 'newuser', 'password123');
    const state = auth.g();
    expect(state.u).toEqual(mockResponse.user);
    expect(localStorage.getItem('tk')).toBe('new-token');
  });

  it('handles registration failure', async () => {
    (api.register as jest.Mock).mockRejectedValue(new Error('Registration failed'));

    await expect(auth.r('test@test.com', 'test', 'pass')).rejects.toThrow();
    const state = auth.g();
    expect(state.e).toBe('Registration failed');
  });

  it('logs in user successfully', async () => {
    const mockResponse = {
      user: { id: '1', email: 'test@test.com', username: 'test', createdAt: '2024-01-01' },
      token: 'login-token'
    };
    (api.login as jest.Mock).mockResolvedValue(mockResponse);

    await auth.l('test', 'password123');
    const state = auth.g();
    expect(state.u).toEqual(mockResponse.user);
    expect(localStorage.getItem('tk')).toBe('login-token');
  });

  it('handles login failure', async () => {
    (api.login as jest.Mock).mockRejectedValue(new Error('Login failed'));

    await expect(auth.l('test', 'wrongpass')).rejects.toThrow();
    const state = auth.g();
    expect(state.e).toBe('Login failed');
  });

  it('logs out user', () => {
    localStorage.setItem('tk', 'some-token');
    auth.o();
    const state = auth.g();
    expect(state.u).toBeNull();
    expect(localStorage.getItem('tk')).toBeNull();
  });

  it('notifies watchers on state change', async () => {
    const watcher = jest.fn();
    const unwatch = auth.w(watcher);

    expect(watcher).toHaveBeenCalled();

    const mockResponse = {
      user: { id: '1', email: 'test@test.com', username: 'test', createdAt: '2024-01-01' },
      token: 'token'
    };
    (api.register as jest.Mock).mockResolvedValue(mockResponse);
    await auth.r('test@test.com', 'test', 'pass');

    expect(watcher.mock.calls.length).toBeGreaterThan(1);
    unwatch();
  });
});
