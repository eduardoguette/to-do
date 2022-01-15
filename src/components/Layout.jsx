import { useQuery, useQueryClient } from 'react-query';
import { Outlet } from 'react-router-dom';
import { getTodos } from '../helpers/todos';
import { Footer } from './Footer';

import { Header } from './Header';
import { Hero } from './Hero';
import { Loader } from './Loader';

export const Layout = () => {
  const queryClient = useQueryClient();
  const [[, user]] = queryClient.getQueriesData('dataUser');
  return (
    <>
      <Header />
      {!user?.idUser ? (
        <Hero />
      ) : (
        <main className='p-5 lg:p-10 '>
          <Outlet />
        </main>
      )}
    </>
  );
};
