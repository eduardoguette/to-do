import React from 'react'; 
import { Link } from 'react-router-dom';  
import { useQueryClient } from 'react-query';  

export const Header = () => {
  const queryClient = useQueryClient();
  const [[,data]] = queryClient.getQueriesData('dataUser');  
  return (
    <>
      <header className='px-10 lg:px-20 py-6 flex justify-between mx-auto bg-white shadow-sm w-full'>
        <Link to='/'>
          <img src='assets/logo.png' alt='Logo To-do' height={20} width={115} />
        </Link>
        <nav>
          <ul className='flex gap-3'>
            {!data && (
              <li>
                <Link to='/session/sign-in'>Iniciar sesión</Link>
              </li>
            )}
            {data && (
              <li>
                <Link to='/account' title='Perfil'>
                  <div className='w-[40px] aspect-square h-[40px]'>{data?.idUser && <img width={40} height={40} className='rounded-full object-cover' src={data?.avatar} alt={data?.profile.name} />}</div>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
};
