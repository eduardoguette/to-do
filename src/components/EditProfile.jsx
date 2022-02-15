import React, { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { getTodos, singOut } from '../helpers/todos';
import { Loader } from './Loader';
import logo from '/img/logo.png';
export const EditProfile = () => {
  const queryClient = useQueryClient();
  const dataToken = queryClient.getQueryData('dataUser');

  useEffect(() => {
    console.log('Edit Profile', dataToken)
  }, [])

  const handleSignOut = () => {
    singOut();
    queryClient.invalidateQueries('dataUser'); 
  };

  return (
    <section className='mx-auto bg-white w-full md:grid md:grid-cols-[minmax(240px,300px),1fr] h-screen xl:px-80'>
      <aside className='py-5 pr-4 bg-white rounded-sm md:border-r md:mx-5 md:py-10 scroll-y-auto'>
        <Link to='/' className='block mx-5'>
          <img src={logo} alt='Logo to-do' className='w-32 mb-5 md:mb-10' />
        </Link>
        <ul className='flex md:flex-col gap-3 overflow-x-auto h-[90%] mx-5 md:mx-0 p-5 snap-x snap-mandatory scroll-smooth'>
          <li className='snap-start'>
            <NavLink
              to='/account/edit-profile'
              className={({ isActive }) =>
                isActive
                  ? 'bg-amaranth-100 rounded-md px-4 py-2 flex items-center gap-3 text-sm font-semibold whitespace-pre w-full'
                  : 'text-sm text-midnight-400 flex items-center gap-3 px-4 py-2 whitespace-pre w-full hover:bg-amaranth-100 rounded-md'
              }
            >
              <svg xmlns='http://www.w3.org/2000/svg' className='hidden w-5 h-5 md:block' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' />
              </svg>
              Editar Perfil
            </NavLink>
          </li>
          <li className='snap-start'>
            <NavLink
              to='/account/change-password'
              className={({ isActive }) =>
                isActive
                  ? 'bg-amaranth-100  rounded-md px-4 py-2 flex items-center gap-3 text-sm font-semibold whitespace-pre w-full'
                  : 'text-sm text-midnight-400 flex items-center gap-3 px-4 py-2 whitespace-pre w-full hover:bg-amaranth-100 rounded-md'
              }
            >
              <svg xmlns='http://www.w3.org/2000/svg' className='hidden w-5 h-5 md:block' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' />
              </svg>
              Cambiar contraseña
            </NavLink>
          </li>
          <li className='snap-start'>
            <NavLink
              to='/account/to-dos/pending'
              className={({ isActive }) =>
                isActive
                  ? 'bg-amaranth-100  rounded-md px-4 py-2 flex items-center gap-3 text-sm font-semibold whitespace-pre w-full'
                  : 'text-sm text-midnight-400 flex items-center gap-3 px-4 py-2 whitespace-pre w-full hover:bg-amaranth-100 rounded-md'
              }
            >
              <svg xmlns='http://www.w3.org/2000/svg' className='hidden w-5 h-5 md:block' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' />
              </svg>
              To-dos Pendientes
            </NavLink>
          </li>
          <li className='snap-start'>
            <NavLink
              to='/account/to-dos/doing'
              className={({ isActive }) =>
                isActive
                  ? 'bg-amaranth-100  rounded-md px-4 py-2 flex items-center gap-3 text-sm font-semibold whitespace-pre w-full'
                  : 'text-sm text-midnight-400 flex items-center gap-3 px-4 py-2 whitespace-pre w-full hover:bg-amaranth-100 rounded-md'
              }
            >
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='hidden w-5 h-5 md:block'>
                <path fill='none' d='M0 0H24V24H0z' strokeWidth={3}></path>
                <path
                  d='M16 2v2h-1v3.243c0 1.158.251 2.301.736 3.352l4.282 9.276c.347.753.018 1.644-.734 1.99-.197.092-.411.139-.628.139H5.344c-.828 0-1.5-.672-1.5-1.5 0-.217.047-.432.138-.629l4.282-9.276C8.749 9.545 9 8.401 9 7.243V4H8V2h8zm-2.612 8.001h-2.776c-.104.363-.23.721-.374 1.071l-.158.361L6.125 20h11.749l-3.954-8.567c-.214-.464-.392-.943-.532-1.432zM11 7.243c0 .253-.01.506-.029.758h2.058c-.01-.121-.016-.242-.021-.364L13 7.243V4h-2v3.243z'
                  fill='currentColor'
                  strokeWidth={3}
                ></path>
              </svg>
              To-dos en proceso
            </NavLink>
          </li>
          <li className='snap-start'>
            <NavLink
              to='/account/to-dos/done'
              className={({ isActive }) =>
                isActive
                  ? 'bg-amaranth-100  rounded-md px-4 py-2 flex items-center gap-3 text-sm font-semibold whitespace-pre w-full text-midnight-400'
                  : 'text-sm text-midnight-400 flex items-center gap-3 px-4 py-2 whitespace-pre w-full hover:bg-amaranth-100 rounded-md'
              }
            >
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='hidden w-5 h-5 pointer-events-none md:block'>
                <path fill='none' d='M0 0h24v24H0z'></path>
                <path
                  d='M11.602 13.76l1.412 1.412 8.466-8.466 1.414 1.414-9.88 9.88-6.364-6.364 1.414-1.414 2.125 2.125 1.413 1.412zm.002-2.828l4.952-4.953 1.41 1.41-4.952 4.953-1.41-1.41zm-2.827 5.655L7.364 18 1 11.636l1.414-1.414 1.413 1.413-.001.001 4.951 4.951z'
                  fill='currentColor'
                ></path>
              </svg>
              To-dos completados
            </NavLink>
          </li>
          <li className='snap-start'>
            <NavLink
              to='/account/to-dos/all'
              className={({ isActive }) =>
                isActive
                  ? 'bg-amaranth-100  rounded-md px-4 py-2 flex items-center gap-3 text-sm font-semibold whitespace-pre w-full text-midnight-400'
                  : 'text-sm text-midnight-400 flex items-center gap-3 px-4 py-2 whitespace-pre w-full hover:bg-amaranth-100 rounded-md'
              }
            >
              <svg xmlns='http://www.w3.org/2000/svg' className='hidden w-6 h-6 md:block' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2'
                />
              </svg>
              Todos los To-dos
            </NavLink>
          </li>
          <li className='md:mt-auto'>
            <button
              to='/account/change-password'
              onClick={handleSignOut}
              className='flex items-center w-full gap-3 px-4 py-2 text-sm whitespace-pre rounded-md hover:bg-amaranth-100 text-midnight-400'
            >
              <svg xmlns='http://www.w3.org/2000/svg' className='hidden w-6 h-6 md:block' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  stroke='currentColor'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                />
              </svg>
              Cerrar session
            </button>
          </li>
        </ul>
      </aside>
      <div className='p-5 bg-white'>
        <Outlet />
      </div>
    </section>
  );
};
