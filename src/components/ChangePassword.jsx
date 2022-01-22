
import { useForm } from '../hooks/useForm';
import logoImg from '../../img/logo.png';
import { updatePassword } from '../helpers/todos';
import { useMutation, useQueryClient } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
export const ChangePassword = () => {
  const queryClient = useQueryClient();
  
  const [{ pass }, setNewPassWord] = useForm({
    pass: '',
  });
  const navigate = useNavigate();
  const { mutateAsync, data } = useMutation(updatePassword, {
    onSuccess: (data) => {
      console.log(data)
      queryClient.invalidateQueries('dataUser');
      queryClient.invalidateQueries('todos'); 
//      navigate('/');
    },
  });
  const handleSubmitChangePass = (e) => {
    e.preventDefault();
    const {token} = queryClient.getQueriesData('dataUser')
    if (pass.trim().length >= 6) mutateAsync({ token, pass });
  };
  return (
    <div className='my-10  max-w-[800px] p-5 lg:p-10 rounded-md overflow-hidden'>
 
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
          <span className='text-sm px-1 text-gray-400'>Mínimo 6 caracteres</span>
        </label>
        <button className='px-4 py-2 w-max bg-amaranth-500 hover:bg-amaranth-400 focus:outline-amaranth-200 font-semibold text-white rounded-md mt-5'>Cambiar contraseña</button>
      </form>
    </div>
  );
};
