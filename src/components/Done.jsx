import { AnimatePresence } from 'framer-motion';
import { useQueryClient } from 'react-query';
import { Todo } from './Todo';

export const Done = () => {
  const queryClient = useQueryClient();
  const [[, data]] = queryClient.getQueriesData('dataUser');
  const [[, [todos]]] = queryClient.getQueriesData('todos');
  return (
    <section>
      <div className='relative'>
        <h1 className='relative z-10 pb-1 pr-2 my-4 text-lg font-semibold border-b-2 border-green-400 w-max'>Completadas</h1>
        <span className='absolute bottom-0 block w-full border-t'></span>
      </div>
      <article className='flex flex-col gap-4'>
        <AnimatePresence>
          {todos &&
            todos
              .filter((todo) => new Date(todo.inserted_at).toDateString() === new Date(data.date).toDateString())
              .map((todo, index) => todo.done && <Todo layoutId={todo.id} key={todo.id} {...todo} index={index} />)}
        </AnimatePresence>
      </article>
    </section>
  );
};
