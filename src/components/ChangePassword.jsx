
import { useForm } from '../hooks/useForm';
import logoImg from '../../img/logo.png';
import { updatePassword } from '../helpers/todos';
import { useMutation, useQueryClient } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
export const ChangePassword = ({ token , setTokenParams}) => {
  const queryClient = useQueryClient();
  const [{ pass }, setNewPassWord] = useForm({
    pass: '',
  });
  const navigate = useNavigate();
  const { mutateAsync } = useMutation(updatePassword, {
    onSuccess: () => {
      queryClient.invalidateQueries('dataUser');
      queryClient.invalidateQueries('todos');
      setTokenParams("")
      navigate('/');
    },
  });
  const handleSubmitChangePass = (e) => {
    e.preventDefault();
    if (pass.trim().length >= 6) mutateAsync({ token, pass });
  };
  return (
    <div className='my-10 bg-white shadow-lg w-80 md:w-96 mx-auto p-5 lg:p-10 rounded-md overflow-hidden'>
      <Link to='/'>
        <img src={logoImg} alt='Logo to-do' className='h-8 mb-8' />
      </Link>
      <h1 className='text-2xl font-bold mb-5'>Cambio de contraseña</h1>
      <form onSubmit={handleSubmitChangePass} className='flex flex-col gap-3'>
        <label className='flex flex-col gap-2' htmlFor='pass'>
          <span className='text-sm'>Introduzca su nueva contraseña</span>
          <input
            id='pass'
            name='pass'
            value={pass}
            className='py-2 px-4 rounded-md border border-gray-300 focus:border-amaranth-300 focus:outline-none focus:ring focus:ring-amaranth-200 outline-none valid:bg-amaranth-50'
            type='password'
            required
            placeholder='Introduzca su nueva contraseña'
            onChange={setNewPassWord}
          />
          <span className='text-sm font-semibold text-gray-400'>Mínimo 6 caracteres</span>
        </label>
        <button className='px-4 py-2 bg-amaranth-500 hover:bg-amaranth-400 focus:outline-amaranth-200 font-semibold text-white rounded-md mt-5'>Cambiar contraseña</button>
      </form>
    </div>
  );
};
