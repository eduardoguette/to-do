import React  from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Router } from './router/Router';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Footer } from './components/Footer'; 
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
      <Router />
      <Footer/>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};
