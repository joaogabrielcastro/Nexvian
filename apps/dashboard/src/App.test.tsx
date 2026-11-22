import { render, screen } from '@testing-library/react';
import { App } from './App';

function stubFetch(status: number, body: unknown) {
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => new Response(JSON.stringify(body), { status })),
  );
}

describe('App', () => {
  it('shows dependency status from the API', async () => {
    stubFetch(503, {
      status: 'degraded',
      checks: { database: 'up', redis: 'down' },
      timestamp: '2026-11-22T12:00:00.000Z',
    });

    render(<App />);

    expect(await screen.findByText('PostgreSQL')).toBeInTheDocument();
    expect(screen.getByText('up')).toBeInTheDocument();
    expect(screen.getByText('down')).toBeInTheDocument();
  });

  it('shows an error when the response does not match the contract', async () => {
    stubFetch(200, { unexpected: true });

    render(<App />);

    expect(await screen.findByRole('alert')).toHaveTextContent('Não foi possível contatar a API.');
  });
});
