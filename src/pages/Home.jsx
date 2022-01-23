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
  // if(status.includes('loading')) return <Loader/>
  if (isLoading) return <Loader />;
  return (
    <section className='md:px-14'>
      <DateNow />
      <div className='md:grid md:grid-cols-3 mx-auto gap-5'>
        <NewTodo />

        <div className='grid gap-5 md:grid-cols-3 row-start-2 col-start-1 col-end-4 mt-5 md:mt-0 mb-20 '>
          <Pending />
          <Doing />
          <Done />
        </div>
      </div>
    </section>
  );
};
