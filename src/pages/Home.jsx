import { useQuery } from 'react-query';
import { DateNow } from '../components/DateNow';
import { Doing } from '../components/Doing';
import { Done } from '../components/Done';
import { Loader } from '../components/Loader';
import { NewTodo } from '../components/NewTodo';
import { Pending } from '../components/Pending';
import { getTodos } from '../helpers/todos';

export const Home = () => {
  const { todos, isLoading } = useQuery('todos', getTodos);  
  if (isLoading) return <Loader />;
  return (
    <section className='md:px-14'>
      <DateNow />
      <div className='gap-5 mx-auto md:grid md:grid-cols-3'>
        <NewTodo />

        <div className='grid col-start-1 col-end-4 row-start-2 gap-5 mt-5 mb-20 md:grid-cols-3 md:mt-0 '>
          <Pending />
          <Doing />
          <Done />
        </div>
      </div>
    </section>
  );
};
