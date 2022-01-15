import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { signUser, user } from '../helpers';
import { useForm } from '../hooks/useForm';

export const SignUp = () => {
  const [{ email, pass }, setValuesAuth] = useForm({
    name: '',
    email: '',
    pass: '',
  });
  const { refetch } = useQuery('dataUser', user, {
    enabled: false,
  });
  const navigate = useNavigate();
  const { mutateAsync } = useMutation(signUser, {
    onSuccess: () => {
      refetch();
    },
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    mutateAsync({ email, pass });

    navigate('/');
  };
  return (
    <>
      <div className='absolute md:top-20 md:right-20 top-5 right-5  flex items-center justify-between'>
        <div className='flex items-center gap-3 text-sm'>
          <span>¿Eres miembro?</span>
          <Link to='/session/sign-in' className='text-amaranth-400 font-semibold'>
            Inicia sesión
          </Link>
        </div>
      </div>
      <div className='w-full md:w-6/12'>
        <h1 className='text-2xl mb-8 font-semibold'>Registrarse en to-do</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
          <label className='flex flex-col gap-2' htmlFor='name'>
            <span className='text-sm'>Nombre</span>
            <input
              id='name'
              name='name'
              value={name}
              className='py-2 px-4 rounded-md border border-gray-300 focus:border-amaranth-300 focus:outline-none focus:ring focus:ring-amaranth-200 outline-none valid:bg-amaranth-50'
              type='name'
              required
              placeholder='Introduzca su nombre'
              onChange={setValuesAuth}
            />
          </label>
          <label className='flex flex-col gap-2' htmlFor='email'>
            <span className='text-sm'>Email</span>
            <input
              id='email'
              name='email'
              value={email}
              className='py-2 px-4 rounded-md border border-gray-300 focus:border-amaranth-300 focus:outline-none focus:ring focus:ring-amaranth-200 outline-none valid:bg-amaranth-50'
              type='email'
              required
              placeholder='Introduzca su email'
              onChange={setValuesAuth}
            />
          </label>
          <label className='flex flex-col gap-2' htmlFor='pass'>
            <span className='text-sm'>Contraseña </span>

            <input
              name='pass'
              value={pass}
              className='py-2 px-4 rounded-md border border-gray-300 focus:border-amaranth-300 focus:outline-none focus:ring focus:ring-amaranth-200 outline-none valid:bg-amaranth-50'
              type='password'
              required
              placeholder='Introduzca su contraseña'
              onChange={setValuesAuth}
            />
          </label>

          <button className='px-4 py-2 bg-amaranth-500 font-semibold text-white rounded-md mt-5 w-max'>Iniciar session</button>
        </form>
      </div>
    </>
  );
};
