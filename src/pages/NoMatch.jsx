import React from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Header } from '../components/Header';

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
        <div className='flex flex-col items-center'>
          <h1 className='text-3xl font-bold'>Esta página no existe 🙁</h1>
          <p className='text-8xl font-bold'>404</p>
        </div>
      </div>
    </>
  );
};
