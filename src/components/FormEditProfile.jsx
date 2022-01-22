import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query'; 
import { updateProfile, uploadAvatar, user } from '../helpers';
import { supabase } from '../helpers/supabaseClient'; 
import { useForm } from '../hooks/useForm';

import imgDefaultUser from '/img/default-avatar.png';


export const FormEditProfile = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, refetch } = useQuery('dataUser', user, {
    enabled: false,
  });
 
  const signUpData = queryClient.getQueryData('dataUser');
  const [pathImg, setPathImg] = useState(null);

  const [{ name, biography, location, avatar }, setValues] = useForm({
    name: signUpData?.profile?.name || '',
    biography: signUpData?.profile?.biography || '',
    avatar: signUpData?.profile?.avatar_url || null,
    location: signUpData?.profile?.location || '',
  });


  const idUser = supabase.auth.session()?.user.id;

  useEffect(() => {
    if (signUpData?.token) refetch();
  }, []);

  const { mutateAsync: updateUser } = useMutation(updateProfile, {
    onSuccess: () => {
      refetch();
    },
  });
  const { mutateAsync: upLoadImg, data: avatar_url } = useMutation(uploadAvatar, {
    onSuccess: (avatar_url) => {
      setPathImg(avatar_url);
      updateUser({ name, id: idUser, avatar_url, location, biography });

    },
  });
  const handleInputImgChange = (event) => {
    upLoadImg(event);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length > 3) {
      updateUser(
        { name, id: idUser, avatar_url: pathImg, location, biography },
        {
          onSuccess: () => {
            queryClient.setQueryData('dataUser', (prev) => (prev = { ...prev, msg: 'Carga en curso. Actualiza en unos momentos para ver tu nuevo avatar.' }));
           queryClient.invalidateQueries('dataUser')
           queryClient.invalidateQueries('todos')
          },
        }
      );
    } else {
      queryClient.setQueryData('dataUser', (prev) => (prev = { ...prev, msg: 'Tu nombre debe ser mayor a 3 caracteres.' }));
    }
  };
  return (
    <section className="w-[min(450px,100%)] mx-auto">
      <div className='flex items-center gap-5 ' >
        <div className='w-full'>
          {signUpData?.token && (
            <div>
              <h1 className='text-xl md:text-4xl font-bold'> ¡Bienvenido!</h1>
              <p className='text-lg md:text-xl font-semibold my-5 text-gray-600'>Completemos algunos datos para tu perfil</p>
            </div>
          )}
          <label className=' relative flex items-center flex-col justify-center cursor-pointer my-4 mx-auto group w-max'>
            <div className='mx-auto relative'>
              <img src={!signUpData?.avatar ? imgDefaultUser : signUpData.avatar} alt='Imagen perfil' height={150} width={150} className='rounded-full object-cover h-[150px] w-[150px]' />
              <input type='file' placeholder='Seleccionar foto' accept='image/*' onChange={handleInputImgChange} className='hidden' />
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6 z-10 absolute block top-0 left-0 right-0 bottom-0 m-auto opacity-0 group-hover:opacity-100'
                fill='none'
                viewBox='0 0 24 24'
                stroke='white'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                />
              </svg>
              <div className='absolute inset-0 bg-gray-800 bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100'></div>
            </div>
            <p className='text-xs font-bold w-full text-center my-2 text-amaranth-500'>Cambiar imagen de perfil</p>
          </label>
        </div>
      </div>
      <form onSubmit={handleSubmit} className='mt-2 flex flex-col gap-3 items-start w-full text-sm'>
        <label className='flex flex-col gap-2 w-full' htmlFor='email'>
          <span className='text-sm'>Nombre</span>
          <input
            id='name'
            name='name'
            value={name}
            className='py-2 px-4 rounded-md border border-gray-300 focus:border-amaranth-300 focus:outline-none focus:ring focus:ring-amaranth-200 outline-none valid:bg-amaranth-50'
            type='name'
            required
            placeholder='Introduzca su Nombre'
            onChange={setValues}
          />
        </label>
        <label className='flex flex-col gap-2 w-full' htmlFor='biography'>
          <span className='text-sm'>Biografía</span>
          <textarea
            id='biography'
            name='biography'
            value={biography}
            className='py-2 px-4 rounded-md border border-gray-300 focus:border-amaranth-300 focus:outline-none focus:ring focus:ring-amaranth-200 outline-none valid:bg-amaranth-50'
            type='biography'
            required
            placeholder='Introduzca su biografía'
            onChange={setValues}
          ></textarea>
        </label>
        <label className='flex flex-col gap-2 w-full' htmlFor='location'>
          <span className='text-sm'>Introduzca su localidad</span>
          <input
            id='location'
            name='location'
            value={location}
            className='py-2 px-4 rounded-md border border-gray-300 focus:border-amaranth-300 focus:outline-none focus:ring focus:ring-amaranth-200 outline-none valid:bg-amaranth-50'
            type='text'
            required
            placeholder='Introduzca su localidad'
            onChange={setValues}
          />
        </label>

        <button type='submit' className='px-4 py-2 bg-amaranth-500 font-semibold text-white rounded-md mt-5'>
          Guardar
        </button>
      </form>
    </section>
  );
};
