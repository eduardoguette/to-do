import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';
import { signUp } from '../helpers/todos';
import { useForm } from '../hooks/useForm';
import imgLogo from '/img/logo.png';

export const SignUp = () => {
  const styleToast = {
    style: {
      minInlineSize: '300px',
      maxInlineSize: '1000px',
    },
    duration: 5000,
  };
  const [{ re_password, email, password }, setValuesAuth] = useForm({
    email: '',
    password: '',
    re_password: '',
  });

  const { mutateAsync } = useMutation(signUp, {
    onSuccess: (data) => {
      toast.remove();
      console.log(data)
      const [{ identities }] = data;
      if (!!identities) {
     //   toast.error('Error al crear el usuario', styleToast);
      //  return;
      }

      if (identities.length > 0) {
        toast.success('Usuario creado con exito, las instrucciones se enviaron a su correo', styleToast);
      } else {
        toast.error('Ya existe una cuenta asociada a ese correo, ¡por favor intente con otro email!', styleToast);
      }
    },
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (re_password === password) {
      toast.loading('Creando cuenta...', styleToast);
      mutateAsync({ email, password });
    } else {
      toast.error('Las contraseñas no coinciden', styleToast);
    }
  };
  return (
    <>
      <div className='absolute items-center justify-between hidden md:top-20 md:right-20 top-5 right-5 md:flex'>
        <div className='flex items-center gap-3 text-sm'>
          <span>¿Eres miembro?</span>
          <Link to='/session/sign-in' className='font-semibold text-amaranth-400'>
            Inicia sesión
          </Link>
        </div>
      </div>
      <div className='w-full md:w-6/12'>
        <Link to='/' className='block mx-auto mb-10 md:hidden'>
          <img src={imgLogo} alt='Logo' width={120} />
        </Link>
        <h1 className='mb-8 text-2xl font-semibold'>Registrarse en to-do</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
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
          <label className='flex flex-col gap-2' htmlFor='password'>
            <span className='text-sm'>Contraseña </span>

            <input
              name='password'
              value={password}
              className='px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-amaranth-300 focus:outline-none focus:ring focus:ring-amaranth-200 valid:bg-amaranth-50'
              type='password'
              required
              placeholder='Introduzca su contraseña'
              onChange={setValuesAuth}
            />
          </label>
          <label className='flex flex-col gap-2' htmlFor='re_password'>
            <span className='text-sm'>Repite la contraseña </span>
            <input
              name='re_password'
              id='re_password'
              value={re_password}
              className='px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-amaranth-300 focus:outline-none focus:ring focus:ring-amaranth-200 valid:bg-amaranth-50'
              type='password'
              required
              placeholder='Introduzca nuevamente su contraseña'
              onChange={setValuesAuth}
            />
          </label>

          <button className='px-4 py-2 mt-5 font-semibold text-white rounded-md bg-amaranth-500 w-max focus:outline-amaranth-200'>Registrarse</button>
        </form>
        <div className='flex items-center justify-center gap-3 mt-5 text-sm md:hidden'>
          <span>¿Eres miembro?</span>
          <Link to='/session/sign-in' className='font-semibold text-amaranth-400'>
            Inicia sesión
          </Link>
        </div>
      </div>
    </>
  );
};
