import { useMutation, useQuery, useQueryClient } from 'react-query';
import { DateNow } from '../components/DateNow';
import { Doing } from '../components/Doing';
import { Done } from '../components/Done';
import { Hero } from '../components/Hero';
import { Loader } from '../components/Loader';
import { NewTodo } from '../components/NewTodo';
import { Pending } from '../components/Pending';
import { getTodos } from '../helpers/todos';

export const Home = () => {
  const queryClient = useQueryClient();
  const [[, data]] = queryClient.getQueriesData('dataUser');
  const todos = queryClient.getQueriesData('todos')
  // queryClient.invalidateQueries('todos');
 
  // if(status.includes('loading')) return <Loader/>
 

  return (
    <>
      {todos && data && (
        <div className='px-5 md:px-20  '>
          <DateNow />
          <div className='md:grid md:grid-cols-3 mx-auto gap-5'>
            <NewTodo />
            <div className='grid gap-5 md:grid-cols-3 row-start-2 col-start-1 col-end-4'>
              <Pending />
              <Doing />
              <Done />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
