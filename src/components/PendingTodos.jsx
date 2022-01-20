import React from 'react';
import { useQueryClient } from 'react-query';
import pendingImg from '../../img/pendiente.png';
import { CardTodo } from './CardTodo';

export const PendingTodos = () => {
  const queryClient = useQueryClient();
  const [[, [todos]]] = queryClient.getQueriesData('todos');
    // const todos = queryClient.getQueriesData('todos'); 
  return (
    <ul className='grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] grid-rows-auto gap-5'>
      {todos.map(({ task, id, inserted_at, doing, done }) => !doing && !done && <CardTodo key={id} task={task} id={id} inserted_at={inserted_at} doing={doing} done={done} />)}
      {todos.filter(({ done, doing }) => !done && !doing).length < 1 && (
        <div className='flex flex-col items-center'>
          <img src={pendingImg} className='mx-auto block' alt='Todos Pendientes illustration' width={400} />
          <p className='text-center'>No tienes nada aquí.</p>
        </div>
      )}
    </ul>
  );
};
