import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppRouter } from './router/AppRouter';
import { ReactQueryDevtools } from 'react-query/devtools'; 
export const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
 
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};
