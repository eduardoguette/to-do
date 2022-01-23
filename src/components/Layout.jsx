import { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { user } from '../helpers'; 
import { getTodos } from '../helpers/todos'; 
import { Footer } from './Footer';

import { Header } from './Header';
import { Hero } from './Hero';
import { Loader } from './Loader';
import { MsgUser } from './MsgUser';

export const Layout = () => {
  const queryClient = useQueryClient();
  const { hash } = useLocation();
  let token;

  const {
    data,
    isLoading: loading,
    data: resp_user,
  } = useQuery('dataUser', user, {
    enabled: false,
  });

  const { data: todos, isLoading, isSuccess } = useQuery('todos', getTodos);

  const navigate = useNavigate();

  useEffect(() => {
    token = hash.split('access_token=').pop().split('&expires_in').shift();
    if (hash.includes('&type=signup')) {
      queryClient.setQueryData('dataUser', (prev) => (prev = { ...prev, token }));
      navigate('/account/edit-profile');
    } else {
      queryClient.refetchQueries('dataUser');
    }
    if (data?.estado === 'noProfile') {
      navigate('/session/sign-in');
    } 
  }, []);

  if ((data?.estado === 'isUser' && isLoading) || isLoading || loading) return <Loader />;
  return (
    <> 
      <Header />
      {data?.estado === 'noUser' && <Hero />}
      {data.profile && todos && (
        <main className='p-4 md:px-0 mb-20 md:mb-0 min-h-[90vh] max-w-[1200px] mx-auto'>
          <Outlet />
        </main>
      )}
      <Footer />
    </>
  );
};
