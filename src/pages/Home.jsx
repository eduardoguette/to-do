 
import { useLocation } from 'react-router-dom';
import { DateNow } from '../components/DateNow';
import { Doing } from '../components/Doing';
import { Done } from '../components/Done';
import { NewTodo } from '../components/NewTodo';
import { Pending } from '../components/Pending'; 

export const Home = () => {
  const { pathname } = useLocation();
  localStorage.setItem('lastPathTODO', pathname);
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
