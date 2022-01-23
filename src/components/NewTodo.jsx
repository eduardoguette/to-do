import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { createTodo, getTodos } from '../helpers/todos';
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
      queryClient.invalidateQueries('todos')
    },
  });
  const handleSendTodo = (e) => {
    e.preventDefault();
    const user_id = data.idUser;
    const inserted_at = data.date;
    mutate({ id: Date.now(), doing, done, inserted_at, task, user_id });
    reset();
  };
  return (
    <>
      <form onSubmit={handleSendTodo} className='flex flex-col  items-start w-full gap-3'>
        <label className='w-full' htmlFor='task'>
          <textarea
            className='text-gray-500 focus:outline-amaranth-200 focus:text-gray-900 text-sm px-4 py-2 rounded-md border shadow-md border-gray-200 w-full h-full'
            id='task'
            onChange={setValues}
            required={true}
            name='task'
            value={task}
            placeholder='Por ej., Comprar regalo mañana a las 6pm'
          ></textarea>
        </label>
        <button className='bg-amaranth-500 gap-2 w-full justify-center hover:bg-amaranth-200 hover:text-black  py-2 text-white flex px-4 rounded-md shadow-md'>
          Guardar
          
        </button>
      </form>
    </>
  );
};
