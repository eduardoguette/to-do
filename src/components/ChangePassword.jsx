import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import { updatePassword } from '../helpers/todos';
import { useForm } from '../hooks/useForm';
export const ChangePassword = () => {
  const queryClient = useQueryClient();

  const [{ pass }, setNewPassWord] = useForm({
    pass: '',
  });

  const { mutateAsync, data } = useMutation(updatePassword, {
    onSuccess: (data) => {
      toast.remove(); // remove the last toast
      toast.success('¡Contraseña actualizada con éxito!');
      queryClient.invalidateQueries('dataUser');
      queryClient.invalidateQueries('todos');
      //      navigate('/');
    },
  });
  const handleSubmitChangePass = (e) => {
    e.preventDefault();

    const { token } = queryClient.getQueriesData('dataUser');

    if (pass.trim().length >= 6) {
      toast.loading('Cambiando contraseña...');
      mutateAsync({ token, pass });
      return;
    }
    toast.error('La contraseña debe tener al menos 6 caracteres', {
      style:{
        minInlineSize: "300px",
        maxInlineSize: "1000px",
      }
    });
  };
  return (
    <div className='my-10  max-w-[800px] p-5 lg:p-10 rounded-md overflow-hidden'>
      <h1 className='mb-5 text-2xl font-bold'>Cambio de contraseña</h1>
      <form onSubmit={handleSubmitChangePass} className='flex flex-col gap-3'>
        <label className='flex flex-col gap-2' htmlFor='pass'>
          <span className='text-sm'>Introduzca su nueva contraseña</span>
          <input
            id='pass'
            name='pass'
            value={pass}
            className='px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-amaranth-300 focus:outline-none focus:ring focus:ring-amaranth-200 valid:bg-amaranth-50'
            type='password'
            required
            placeholder='Introduzca su nueva contraseña'
            onChange={setNewPassWord}
          />
          <span className='px-1 text-sm text-gray-400'>Mínimo 6 caracteres</span>
        </label>
        <button className='px-4 py-2 mt-5 font-semibold text-white rounded-md w-max bg-amaranth-500 hover:bg-amaranth-400 focus:outline-amaranth-200'>Cambiar contraseña</button>
      </form>
    </div>
  );
};
