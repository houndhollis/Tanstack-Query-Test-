import { QueryClient , QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Posts from './Posts';

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Posts/>
      <ReactQueryDevtools/>
    </QueryClientProvider>
  );
}

export default App;
