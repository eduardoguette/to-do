import logo from '../../img/logo.png';
import { Link } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import imgDefaultUser from '/img/default-avatar.png';
import { singOut } from '../helpers/todos';
export const Header = () => {
  const queryClient = useQueryClient();
  const [[, data]] = queryClient.getQueriesData('dataUser');
  const handleSignOut = () => {
    singOut(); 
    queryClient.removeQueries('todos')
    queryClient.invalidateQueries('dataUser')
  }
  return (
    <>
      <header className='bg-white shadow-sm relative z-10'>
        <div className='max-w-[1200px] flex justify-between px-5 py-6 md:px-14 mx-auto'>
          <Link to='/'>
            <img src={logo} alt='Logo To-do' height={20} width={115} />
          </Link>
          <nav>
            <ul className='flex gap-3'>
              {!data?.idUser && (
                <li>
                  <Link to='/session/sign-in'>Iniciar sesión</Link>
                </li>
              )}
              {data?.idUser && (
                <li className='relative group'>
                  <Link className="relative z-20" to='/account/edit-profile' title='Perfil'>
                    <div className='w-[40px] aspect-square h-[40px]'>
                      <img src={!data.avatar ? imgDefaultUser : data.avatar} alt='Imagen perfil' height={40} width={40} className='rounded-full mx-auto h-[40px] w-[40px] object-cover' />{' '}
                    </div>
                  </Link>
                  <div className='absolute z-10 -left-[250%] -bottom-[190%] hidden group-hover:block '>
                    <ul className='bg-white shadow-lg rounded-md overflow-hidden mt-2 border'>
                      <li className="w-full ">
                        <Link to='/account/edit-profile' className='whitespace-nowrap text-sm w-full block pl-4 pr-10 hover:bg-amaranth-100 py-2'>
                          Editar Perfil
                        </Link>
                      </li>
                      <li>
                        <button onClick={handleSignOut} className='whitespace-nowrap pl-4 pr-10 py-2 w-full block text-sm hover:bg-amaranth-100'>Cerrar sessión</button>
                      </li>
                    </ul>
                  </div>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};
