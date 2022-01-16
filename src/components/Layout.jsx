import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ChangePassword } from './ChangePassword';

import { Header } from './Header';
import { Hero } from './Hero';
import { Loader } from './Loader';

export const Layout = () => {
  const queryClient = useQueryClient();
  const [[, user]] = queryClient.getQueriesData('dataUser');
  const { hash } = useLocation();
  const [tokenParams, setTokenParams] = useState(null);
  useEffect(() => {
    const token = hash.split('access_token=').pop().split('&expires_in').shift();
    if (hash.includes('type=recovery')) {
      setTokenParams(token);
    }
  }, []);

  if (tokenParams) return <ChangePassword token={tokenParams} />;
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
