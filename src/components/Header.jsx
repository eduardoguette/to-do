 
import logo from '../../img/logo.png'
import { Link } from 'react-router-dom';  
import { useQueryClient } from 'react-query';  
import imgDefaultUser from "/img/default-avatar.png"
export const Header = () => {
  const queryClient = useQueryClient();
  const [[,data]] = queryClient.getQueriesData('dataUser');  
  return (
    <>
      <header className='px-10 lg:px-20 py-6 flex justify-between mx-auto bg-white shadow-sm w-full'>
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
              <li>
                <Link to='/account/view-profile' title='Perfil'>
                  <div className='w-[40px] aspect-square h-[40px]'><img src={!data.avatar ? imgDefaultUser : data.avatar} alt='Imagen perfil' height={40} width={40} className='rounded-full mx-auto' /> </div>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
};
