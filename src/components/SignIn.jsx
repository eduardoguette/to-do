import React from 'react';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { logIn } from '../helpers/todos';
import { useForm } from '../hooks/useForm';
import imgLogo from '/img/logo.png';

export const SignIn = () => {
  const queryClient = useQueryClient();

  const [{ email, pass }, setValuesAuth] = useForm({
    email: '',
    pass: '',
  });
  const navigate = useNavigate();

  const { mutate, data } = useMutation(logIn, {
    onSuccess: (data) => {
      toast.remove(); // remove loader
      const [, , message] = data || null;

      if (message?.message) {
        toast.error('¡Oh! La contraseña o tu email no son validos ', {
          duration: 5000,
          icon: '😢',
          style: {
            minInlineSize: '300px',
            maxInlineSize: '1000px',
          },
        });
      }
      const [, { access_token }] = data;
      if (access_token) {
        toast.success('¡Bienvenido de nuevo!', { icon: '😀' });
        queryClient.setQueryData('dataUser', (prev) => (prev = { ...prev, logged: true }));
        navigate('/home', {
          replace: true,
        });
      }
    },
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    toast.loading('Iniciando sesión...');
    mutate({ email, password: pass });
  };

  return (
    <>
      <div className='absolute items-center justify-between hidden md:flex md:top-20 md:right-20 top-5 right-5'>
        <div className='flex items-center gap-3 text-sm'>
          <span>¿No es un miembro?</span>
          <Link to='/session/sign-up' className='font-semibold text-amaranth-400'>
            Regístrate ahora
          </Link>
        </div>
      </div>
      <div className='w-full mt-5 md:w-6/12'>
        <Link to='/' className='block mx-auto mb-10 md:hidden'>
          <img src={imgLogo} alt='Logo' width={120} />
        </Link>
        <h1 className='mb-8 text-3xl font-semibold'>Iniciar sesión</h1>
        <form onSubmit={handleSubmit} className='flex flex-col'>
          <label className='flex flex-col gap-2' htmlFor='email'>
            <span className='text-sm'>Email</span>
            <input
              id='email'
              name='email'
              value={email}
              className='px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-amaranth-300 focus:outline-none focus:ring focus:ring-amaranth-200 valid:bg-amaranth-50'
              type='email'
              required
              placeholder='Introduzca su email'
              onChange={setValuesAuth}
            />
          </label>
          <label className='flex flex-col gap-2 mt-5' htmlFor='pass'>
            <div className='flex items-center justify-between'>
              <span className='text-sm'>Contraseña </span>
              <Link to='/session/password_resets' className='text-xs text-right text-amaranth-400'>
                ¿Olvidó su contraseña?
              </Link>
            </div>
            <input
              name='pass'
              value={pass}
              className='px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-amaranth-300 focus:outline-none focus:ring focus:ring-amaranth-200 valid:bg-amaranth-50'
              type='password'
              required
              placeholder='Introduzca su contraseña'
              onChange={setValuesAuth}
            />
          </label>
          <button className='px-4 py-2 mt-5 font-semibold text-white rounded-md bg-amaranth-500 focus:outline-amaranth-200'>Iniciar session</button>
        </form>
        <div className='flex items-center justify-center gap-3 mt-8 text-sm md:hidden'>
          <span>¿No es un miembro?</span>
          <Link to='/session/sign-up' className='font-semibold text-amaranth-400'>
            Regístrate ahora
          </Link>
        </div>
      </div>
    </>
  );
};
