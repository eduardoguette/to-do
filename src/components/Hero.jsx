import { Link } from 'react-router-dom';
import imgHero from '../../img/hero-img.png'

export const Hero = () => {
  return (
    <>
      <section className='hero flex flex-col md:grid md:grid-cols-[40%,1fr] items-center p-10 md:p-14 justify-center bg-amaranth-50'>
        <div>
          <h1 className='text-5xl font-bold md:w-[300px] lg:w-[400px]'>Organiza tu día con to-do.</h1>
          <p className='mt-3'>Recupera tu claridad y tranquilidad sacando todas esas tareas de tu cabeza para ponerlas en tu lista de tareas.</p>
          <Link to='/session/sign-up' className='bg-amaranth-500 focus:outline-amaranth-200 text-white font-semibold px-4 py-2 rounded-md mt-4 block w-max'>
            Registrarme
          </Link>
        </div>
        <img src={imgHero} alt='Imagen hero' className='block mt-10 md:mt-0 md:ml-auto w-60  md:w-[350px]' />
      </section>
    </>
  );
};
