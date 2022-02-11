import React from 'react';
import { useQueryClient } from 'react-query';
import { timeSince } from '../helpers';
import { CardTodo } from './CardTodo';
import { Pending } from './Pending';

export const AllTodos = () => {
  const queryClient = useQueryClient(); 
  const [[, [todos]]] = queryClient.getQueriesData('todos')
  
  return (
    <>
      <ul className='grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] grid-rows-auto gap-5'>
        {todos.map(({ task, id, inserted_at, doing, done }) => (
          <CardTodo key={id} task={task} id={id} inserted_at={inserted_at} doing={doing} done={done} />
        ))}
      </ul>
    </>
  );
};
