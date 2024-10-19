import fetchCards from './cards';
import fetch from 'node-fetch';
import { jest } from '@jest/globals';

jest.mock('node-fetch');

describe('fetchCards', () => {
  it('should return data when API call is successful', async () => {
    const req = {
      query: {
        pageSize: 5,
        page: 1,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockData = { cards: [] };
    fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    });

    await fetchCards(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockData);
  });

  it('should return 500 if API key is missing', async () => {
    const req = {
      query: {},
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    process.env.REACT_APP_API_KEY = '';

    await fetchCards(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'API key is missing' });
  });

  it('should return error status if API call fails', async () => {
    const req = {
      query: {},
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    process.env.REACT_APP_API_KEY = 'test-api-key';

    fetch.mockResolvedValue({
      ok: false,
      status: 404,
    });

    await fetchCards(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Failed to fetch cards' });
  });
});