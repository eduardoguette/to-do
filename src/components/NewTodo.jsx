import { useMutation, useQueryClient } from 'react-query';
import { createTodo } from '../helpers/todos';
import { useForm } from '../hooks/useForm';

export const NewTodo = () => {
  const queryClient = useQueryClient();
  const [[, data]] = queryClient.getQueriesData('dataUser');

  const [{ doing, done, task }, setValues, reset] = useForm({
    task: '',
    done: false,
    doing: false,
  });

  const { mutate } = useMutation(createTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
    },
  });
  const handleSendTodo = (e) => {
    e.preventDefault();
    const user_id = data.idUser;
    const inserted_at = data.date;
    mutate({ id: crypto.randomUUID(), doing, done, inserted_at, task, user_id });
    reset();
  };
  return (
    <>
      <form onSubmit={handleSendTodo} className='flex flex-col items-start w-full gap-3'>
        <label className='w-full' htmlFor='task'>
          <textarea
            className='w-full h-full px-4 py-2 text-sm text-gray-500 border border-gray-200 rounded-md shadow-md focus:outline-amaranth-200 focus:text-gray-900'
            id='task'
            onChange={setValues}
            required={true}
            name='task'
            value={task}
            placeholder='Por ej., Comprar regalo mañana a las 6pm'
          ></textarea>
        </label>
        <button className='flex justify-center w-full gap-2 px-4 py-2 text-white rounded-md shadow-md bg-amaranth-500 hover:bg-amaranth-200 hover:text-black focus:outline-amaranth-200'>
          Guardar
        </button>
      </form>
    </>
  );
};
