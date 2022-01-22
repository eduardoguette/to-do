import { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { user } from '../helpers';
import { getTodos } from '../helpers/todos';
import { ChangePassword } from './ChangePassword';
import { EditProfile } from './EditProfile';
import { Footer } from './Footer';

import { Header } from './Header';
import { Hero } from './Hero';
import { Loader } from './Loader';
import { MsgUser } from './MsgUser';

export const Layout = () => {
  const queryClient = useQueryClient();
  const { data, isLoading: loading } = useQuery('dataUser', user);
  const { data: todos, isLoading } = useQuery('todos', getTodos);
  const { hash } = useLocation();
  const navigate = useNavigate();

  let token;
  useEffect(() => {
    token = hash.split('access_token=').pop().split('&expires_in').shift();
    if (hash.includes('&type=signup')){
      queryClient.setQueryData('dataUser', (prev) => (prev = { ...prev, estado: 'sing-up', token }));
      navigate('/account/edit-profile');
    } 
  }, [data]);

  //  if (token && !user) return <ChangePassword />;

  if (isLoading || loading) return <Loader />;
  return (
    <>
      <MsgUser />
      <Header />
      {data?.estado === 'noUser' && <Hero />}
      {data.idUser && (
        <main className='p-4 min-h-[90vh] max-w-[1200px] mx-auto'>
          <Outlet />
        </main>
      )}
      <Footer />
    </>
  );
};
