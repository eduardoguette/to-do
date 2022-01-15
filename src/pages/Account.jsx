import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Outlet } from 'react-router-dom';
import { CardProfile } from '../components/CardProfile';
import { NavAccount } from '../components/NavAccount';

export const Account = () => {
  return (
    <>
      <div className='lg:px-20'>
        <CardProfile />
        <NavAccount />
        <section>
          <Outlet />
        </section>
      </div>
    </>
  );
};
