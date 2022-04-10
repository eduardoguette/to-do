import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { recoverPassword } from '../helpers';
import { useForm } from '../hooks/useForm';
import imgLogo from "/img/logo.png";

export const Forgot = () => {
  const queryClient = useQueryClient();
  const [{ email }, setValuesAuth] = useForm({
    email: '',
  });
  const { mutate } = useMutation(recoverPassword);
  const handleSubmit = (evt) => {
    evt.preventDefault();
    mutate(email, {
      onSuccess: () => {
        toast.success('Se ha enviado un correo con las instrucciones para recuperar la contraseña',{duration:5000, style:{
          minWidth: '300px',
          maxInlineSize: "1000px"
        }});
      },
    });
  };

  return (
    <>
      <div className='flex items-center justify-between mb-10 md:absolute md:left-20 md:top-20 md:right-20 left-5 top-5 right-5'>
        <Link to='/session/sign-in' className='p-1 font-semibold text-white rounded-md bg-amaranth-400'>
          <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
          </svg>
        </Link>
        <p className='text-xs '>
          ¿No es un miembro?
          <Link to='/session/sign-up' className='font-semibold text-amaranth-400'>
            {' '}
            Regístrate ahora
          </Link>
        </p>
      </div>
      <div className='md:w-6/12'>
      <Link to="/" className='block mx-auto mb-10 md:hidden'>
          <img src={imgLogo} alt="Logo" width={120}/>
        </Link>
        <h1 className='mb-4 text-2xl font-semibold'>Perdiste tu contraseña?</h1>
        <p className='mb-4'>Ingrese la dirección de correo electrónico que utilizó cuando se unió y le enviaremos instrucciones para restablecer su contraseña.</p>
        <form onSubmit={handleSubmit} className='flex flex-col'>
          <label className='flex flex-col gap-2' htmlFor='email'>
            <span className='text-sm font-semibold'>Email</span>
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

          <button className='px-4 py-2 mt-5 text-sm font-semibold text-white rounded-md bg-amaranth-500 hover:bg-amaranth-300 focus:outline-amaranth-200 w-max'>Enviar instrucciones de reinicio</button>
        </form>
      </div>
    </>
  );
};
