import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from 'react-router-dom';
import PlanetsAll from './PlanetsAll';
import { Provider } from 'react-redux';
import { appStore } from 'src/store/appStore';

const queryClient = new QueryClient();

describe('PlanetsAll component', () => {
  test('renders loading state initially', async () => {
    render(
      <Provider store={appStore}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <PlanetsAll />
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    );

    expect(screen.getByText('Loading planets ...')).toBeInTheDocument();
  });
});
