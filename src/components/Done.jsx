import { useQueryClient } from 'react-query';
import { Todo } from './Todo';

export const Done = () => {
  const queryClient = useQueryClient();
  const [[, data]] = queryClient.getQueriesData('dataUser');
  const [[, [todos]]] = queryClient.getQueriesData('todos');
  return (
    <section>
      <div className='relative'>
        <h1 className='text-lg font-semibold my-4 border-b-2 border-green-400 relative z-10 w-max pr-2 pb-1'>Completadas</h1>
        <span className='absolute border-t bottom-0 block w-full'></span>
      </div>
      <article className='flex flex-col gap-4'>{todos && todos.filter((todo) => new Date(todo.inserted_at).toDateString() === new Date(data.date).toDateString()).map(({ task, id, done, doing, user_id, inserted_at}) => done && <Todo key={id} id={id} task={task} user_id={user_id} inserted_at={inserted_at} done={done} doing={doing} />)}</article>
    </section>
  );
};
