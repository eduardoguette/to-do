import React from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Header } from '../components/Header';
import imgNoMatch from "/img/no-match.png"
export const NoMatch = () => {
  const data = useParams();
  const navigate = useNavigate();
  if (data['*'].includes('type=recovery')) {
    navigate('/session/reset');
  }
  return (
    <> 
      <Header />
      <div className='grid place-items-center'>
        <div className='flex flex-col items-center relative'>
          <img src={imgNoMatch} alt="Img 404" className="h-[300px] mb-2" />
          <p>¡Oh, te has perdido!</p>
          <h1 className='text-2xl font-bold'>Esta página no existe.</h1>
          <p className='text-2xl md:text-8xl my-3 opacity-30 font-bold'>404</p>
          <Link to="/" className="border-amaranth-500 border-2 px-4 py-2 rounded-md hover:bg-amaranth-500 hover:text-white">Volver</Link>
        </div>
      </div>
    </>
  );
};
