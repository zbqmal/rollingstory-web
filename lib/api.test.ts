import { api, ApiError } from './api';

// Mock fetch
global.fetch = jest.fn();

describe('API Client', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('ApiError', () => {
    it('creates an error with status and message', () => {
      const error = new ApiError(404, 'Not found');
      expect(error.status).toBe(404);
      expect(error.message).toBe('Not found');
      expect(error.name).toBe('ApiError');
    });
  });

  describe('api.register', () => {
    it('sends POST request to /auth/register', async () => {
      const mockResponse = { user: { id: '1', email: 'test@example.com' }, token: 'abc' };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await api.register('test@example.com', 'testuser', 'password123');

      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:3001/auth/register',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ 
            email: 'test@example.com', 
            username: 'testuser', 
            password: 'password123' 
          }),
        })
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
