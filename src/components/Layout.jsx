import { useEffect } from 'react';
import { useQueryClient } from 'react-query'; 
import { Footer } from './Footer';

import { Header } from './Header'; 
import { Home } from '../pages/Home'; 

export const Layout = () => {
  const queryClient = useQueryClient();  
  

  useEffect(() => {
    queryClient.invalidateQueries('dataUser') 
    queryClient.invalidateQueries('todos')  
  }, []);
 
  
  return (
    <>
      <>
        <Header />
        <main className='p-4 md:px-0 mb-20 md:mb-0 min-h-[90vh] max-w-[1200px] mx-auto'>
          <Home />
        </main>
        <Footer />
      </>
    </>
  );
};
