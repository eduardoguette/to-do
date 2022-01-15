import React from 'react';
import { useQueryClient } from 'react-query';
import { CardTodo } from './CardTodo';
import doingImg from '../../img/haciendo.png'
export const DoingTodos = () => {
  const queryClient = useQueryClient();
  const [[, [todos]]] = queryClient.getQueriesData('todos');

  return (
    <ul className='grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] grid-rows-auto gap-5'>
      {todos.map(({ task, id, inserted_at, doing, done }) => doing && <CardTodo key={id} task={task} id={id} inserted_at={inserted_at} doing={doing} done={done} />)}
      {todos.filter(({ doing }) => doing).length < 1 && (
        <div className='flex flex-col items-center'> 
          <img src={doingImg} className='mx-auto block' alt='Haciend illustration' width={400} />
          <p className='text-center'>No tienes nada en proceso aún. </p>
        </div>
      )
      }
    </ul>
  );
};
