import React from 'react';
import { useQueryClient } from 'react-query';
import { CardTodo } from './CardTodo';
import doneImg from "../../img/complete.png"
export const DoneTodos = () => {
  const queryClient = useQueryClient();
  const [[, [todos]]] = queryClient.getQueriesData('todos');
  // const todos = queryClient.getQueriesData('todos');
  return (
    <ul className='grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] grid-rows-auto gap-5'>
      {todos.map(({ task, id, inserted_at, doing, done }) => done && <CardTodo key={id} task={task} id={id} inserted_at={inserted_at} doing={doing} done={done} />)}
      {todos.filter(({ done }) => done).length < 1 && (
        <div className='flex flex-col items-center'>
          <img src={doneImg} className='mx-auto block' alt='Completado illustration' width={400} />
          <p className='text-center'>Aún no has finalizado tu primera tarea. </p>
        </div>
      )}
    </ul>
  );
};
