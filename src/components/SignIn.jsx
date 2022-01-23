import React, { useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { logIn, singOut } from '../helpers/todos';
import { useForm } from '../hooks/useForm';
import imgLogo from "/img/logo.png"


export const SignIn = () => {
  const queryClient = useQueryClient();
  const [{ email, pass }, setValuesAuth] = useForm({
    email: '',
    pass: '',
  });
  const navigate = useNavigate();
  useEffect(() => {
    singOut();
  }, []);

  const { mutate, data } = useMutation(logIn, {
    onSuccess: (data) => {
      const [, , message] = data || null;
      if (message?.message) {
        return queryClient.setQueryData('dataUser', (prev) => (prev = { ...prev, msg: message.message }));
      }
      queryClient.invalidateQueries('dataUser');
      queryClient.invalidateQueries('todos');
      const [[, user]] = queryClient.getQueriesData('dataUser');
      if (user && !message) navigate('/');
    },
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    mutate(
      { email, password: pass },
      {
        onSuccess: () => {
          queryClient.setQueryData('dataUser', (prev) => (prev = { ...prev, estado: 'isUser' }));
        },
      }
    );
  };
  return (
    <>
      <div className='absolute hidden md:flex md:top-20 md:right-20 top-5 right-5  items-center justify-between'>
        <div className='flex items-center gap-3 text-sm'>
          <span>¿No es un miembro?</span>
          <Link to='/session/sign-up' className='text-amaranth-400 font-semibold'>
            Regístrate ahora
          </Link>
        </div>
      </div>
      <div className='w-full md:w-6/12 mt-5'>
        <Link to="/" className='md:hidden mb-10 block mx-auto'>
          <img src={imgLogo} alt="Logo" width={120}/>
        </Link>
        <h1 className='text-3xl mb-8 font-semibold'>Iniciar sesión</h1>
        <form onSubmit={handleSubmit} className='flex flex-col'>
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
          <label className='flex flex-col gap-2 mt-5' htmlFor='pass'>
            <div className='flex justify-between items-center'>
              <span className='text-sm'>Contraseña </span>
              <Link to='/session/password_resets' className='text-xs text-amaranth-400 text-right'>
                ¿Olvidó su contraseña?
              </Link>
            </div>
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
          <button className='px-4 py-2 bg-amaranth-500 font-semibold text-white rounded-md mt-5 focus:outline-amaranth-200'>Iniciar session</button>
        </form>
        <div className='md:hidden mt-8 justify-center flex items-center gap-3 text-sm'>
          <span>¿No es un miembro?</span>
          <Link to='/session/sign-up' className='text-amaranth-400 font-semibold'>
            Regístrate ahora
          </Link>
        </div>
      </div>
    </>
  );
};
