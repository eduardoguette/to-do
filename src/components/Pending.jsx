import { useQueryClient } from 'react-query';
import { Todo } from './Todo';

export const Pending = () => {
  const queryClient = useQueryClient();
  const [[, data]] = queryClient.getQueriesData('dataUser');
  const [[, [todos]]] = queryClient.getQueriesData('todos'); 
   

  return (
    <section>
      <div className='relative'>
        <h1 className='text-xl font-semibold my-4 border-b-2 border-amaranth-400 relative z-10 w-max'>Pendientes</h1>
        <span className='absolute border-t bottom-0 block w-full'></span>
      </div>
      <article className='flex flex-col gap-4'>
        {todos &&
          todos
            .filter((todo) => new Date(todo.inserted_at).toDateString() === new Date(data.date).toDateString())
            .map(({ task, id, done, doing, user_id, inserted_at }) => !done && !doing && <Todo key={id} id={id} task={task} user_id={user_id} done={done} doing={doing} inserted_at={inserted_at} />)}
      </article>
    </section>
  );
};
