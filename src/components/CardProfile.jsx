import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../helpers/supabaseClient';
import imgDefaultUser from '/img/default-avatar.png';
export const CardProfile = () => {
  const queryClient = useQueryClient();
  const [[, data]] = queryClient.getQueriesData('dataUser');
  const [viewMenu, setViewMenu] = useState(false);
  const navigate = useNavigate();
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    queryClient.invalidateQueries('dataUser');
    queryClient.invalidateQueries('todos');
    navigate('/');
  };

  return (
    <div className='flex flex-col md:flex-row items-center justify-center mb-5 gap-10'>
      <picture className='block aspect-[120/120] w-[120px] h-[120px]'>
        <img src={!data.avatar ? imgDefaultUser : data.avatar} alt='Imagen perfil' height={120} width={120} className='rounded-full mx-auto' />
      </picture>
      <div className='flex flex-col'>
        <h4 className='text-2xl font-bold'>{data?.profile?.name}</h4>
        <span className='text-sm '>{data?.profile?.biography}</span>
        <div className='flex gap-4 relative mt-3'>
          <Link to='/account/edit-profile' className='border flex items-center text-sm hover:border-midnight-400 font-semibold px-4 py-2 rounded-md'>
            Editar profile
          </Link>
          <button className='border text-sm hover:border-midnight-400 font-semibold  p-2 rounded-md' onClick={() => setViewMenu(!viewMenu)}>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z'
              />
            </svg>
          </button>
          {viewMenu && (
            <>
              <ul className='absolute bg-white -bottom-20 border shadow-md right-0 rounded-md z-20 overflow-hidden'>
                <li>
                  <Link to='/account/view-profile' className='w-full block px-4 py-2 hover:bg-amaranth-100'>
                    Ver perfil
                  </Link>
                </li>
                <li>
                  <button className='w-full px-4 py-2 hover:bg-amaranth-100' onClick={handleSignOut}>
                    Cerrar sesión
                  </button>
                </li>
              </ul>
            </>
          )}
          {viewMenu && <div className='fixed inset-0 z-10' onClick={() => setViewMenu(!viewMenu)}></div>}
        </div>
      </div>
    </div>
  );
};
