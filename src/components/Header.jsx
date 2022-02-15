import logo from '../../img/logo.png';
import { Link } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import imgDefaultUser from '/img/default-avatar.png';
import { singOut } from '../helpers/todos';
import { AnimatePresence, motion } from 'framer-motion';
export const Header = () => {
  const queryClient = useQueryClient();
  const [[, data]] = queryClient.getQueriesData('dataUser');
  
  const handleSignOut = () => {
    singOut();
    queryClient.invalidateQueries('dataUser');
  };
  return (
    <>
      <header className='relative z-10 bg-white shadow-sm'>
        <div className='max-w-[1200px] flex justify-between px-5 py-6 md:px-14 mx-auto'>
          <Link to='/'>
            <img src={logo} alt='Logo To-do' height={20} width={115} />
          </Link>
          <motion.nav>
            <ul className='flex gap-3'>
              {!data?.idUser && (
                <li>
                  <Link to='/session/sign-in'>Iniciar sesión</Link>
                </li>
              )}
              {data?.idUser && (
                <li className='relative group'>
                  <Link className='relative z-20' to='/account/edit-profile' title='Perfil'>
                    <div className='w-[40px] aspect-square h-[40px]'>
                      <img src={!data?.avatar ? imgDefaultUser : data?.avatar} alt='Imagen perfil' height={40} width={40} className='rounded-full mx-auto h-[40px] w-[40px] object-cover' />{' '}
                    </div>
                  </Link>
                  <div className='absolute z-10 -left-[250%] -bottom-[190%] hidden group-hover:block '>
                    <ul className='mt-2 overflow-hidden bg-white border rounded-md shadow-lg'>
                      <li className='w-full '>
                        <Link to='/account/edit-profile' className='block w-full py-2 pl-4 pr-10 text-sm whitespace-nowrap hover:bg-amaranth-100'>
                          Editar Perfil
                        </Link>
                      </li>
                      <li>
                        <button onClick={handleSignOut} className='block w-full py-2 pl-4 pr-10 text-sm whitespace-nowrap hover:bg-amaranth-100'>
                          Cerrar sessión
                        </button>
                      </li>
                    </ul>
                  </div>
                </li>
              )}
            </ul>
          </motion.nav>
        </div>
      </header>
    </>
  );
};
