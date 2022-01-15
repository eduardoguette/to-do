import { useQuery, useQueryClient } from 'react-query';
import { Outlet } from 'react-router-dom';
import { getTodos } from '../helpers/todos';
import { Footer } from './Footer';

import { Header } from './Header';
import { Loader } from './Loader';

export const Layout = () => { 
  const queryClient = useQueryClient()
  const {status} = queryClient.getQueryState()
  if(status.includes('loading')) return <Loader/>
  return (
    <>
      <Header />
      <main className='p-5 lg:p-10 '>
        <Outlet />
      </main>
     
    </>
  );
};
