import { useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { recoverPassword } from '../helpers';
import { useForm } from '../hooks/useForm';

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
        queryClient.setQueryData(
          'dataUser',
          (prev) =>
            (prev = {
              ...prev,
              msg: 'Si esta dirección de correo electrónico se utilizó para crear una cuenta, se le enviarán instrucciones para restablecer su contraseña. Por favor revise su correo electrónico.',
            })
        );
      },
    });
  };

  return (
    <>
      <div className='absolute md:left-20 md:top-20 md:right-20 left-5 top-5 right-5  flex items-center justify-between'>
        <Link to='/session/sign-in' className='font-semibold  bg-amaranth-400 text-white rounded-md p-1'>
          <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
          </svg>
        </Link>
        <p className=' text-xs'>
          ¿No es un miembro?
          <Link to='/session/sign-up' className='text-amaranth-400 font-semibold'>
            {' '}
            Regístrate ahora
          </Link>
        </p>
      </div>
      <div className='md:w-6/12'>
        <h1 className='text-2xl mb-4 font-semibold'>Perdiste tu contraseña?</h1>
        <p className='mb-4'>Ingrese la dirección de correo electrónico que utilizó cuando se unió y le enviaremos instrucciones para restablecer su contraseña.</p>
        <form onSubmit={handleSubmit} className='flex flex-col'>
          <label className='flex flex-col gap-2' htmlFor='email'>
            <span className='text-sm font-semibold'>Email</span>
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

          <button className='px-4 text-sm py-2 bg-amaranth-500 hover:bg-amaranth-300 font-semibold text-white rounded-md mt-5 w-max'>Enviar instrucciones de reinicio</button>
        </form>
      </div>
    </>
  );
};
