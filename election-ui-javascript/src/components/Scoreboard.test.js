import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Scoreboard from './Scoreboard';
import dataFetcher from '../dataFetcher';

jest.mock('../dataFetcher');

test('renders Results', async () => {
  dataFetcher.mockImplementationOnce(() => {
    return Promise.resolve({
      isComplete: false,
      results: [
        {
          'party': 'Independent',
          'candidateId': 2,
          'votes': '9900'
        }
      ]
    })
  });

  render(<Scoreboard />);

  await waitFor(() => {
    const results = screen.getByText(/Independent/i);
    expect(results).toBeInTheDocument();
  });
});

test('renders error state', async () => {
  dataFetcher.mockImplementationOnce(() => {
    throw new Error();
  });

  render(<Scoreboard />);

  await waitFor(() => {
    const errorElement = screen.getByText(/Error/i);
    expect(errorElement).toBeInTheDocument();
  });
});

test('fetches results again when refresh button clicked', async () => {
  dataFetcher.mockImplementationOnce(() => {
    return Promise.resolve({
      isComplete: false,
      results: [
        {
          'party': 'Independent',
          'candidateId': 2,
          'votes': '9900'
        }
      ]
    })
  });

  dataFetcher.mockImplementationOnce(() => {
    return Promise.resolve({
      isComplete: false,
      results: [
        {
          'party': 'Independent',
          'candidateId': 2,
          'votes': '12345'
        }
      ]
    })
  });

  render(<Scoreboard />);

  dataFetcher.mockClear()

  await waitFor(() => {
    const votes = screen.getByText(/9900/i);
    expect(votes).toBeInTheDocument();
  });

  const refreshButton = screen.getByText(/Refresh/i);
  fireEvent.click(refreshButton);

  await waitFor(() => {
    const votesAfterRefresh = screen.getByText(/12345/i);
    expect(votesAfterRefresh).toBeInTheDocument();
  });
});
