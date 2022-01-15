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
      <form onSubmit={handleSendTodo} className='flex w-full gap-3'>
        <label className='w-full' htmlFor='task'>
          <input
            className='before:content-[attr(placeholder)] text-gray-500 focus:text-gray-900 text-sm px-4 py-2 rounded-md focus:outline-midnight-500 border shadow-md border-midnight-400 w-full h-full'
            id='task'
            onChange={setValues}
            required={true}
            name='task'
            value={task}
            placeholder='Por ej., Comprar regalo mañana a las 6pm'
          ></input>
        </label>
        <button className='bg-midnight-400 hover:bg-midnight-300 p-2 text-white rounded-md shadow-md h-full'>
          <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 13l-5 5m0 0l-5-5m5 5V6' />
          </svg>
        </button>
      </form>
    </>
  );
};
