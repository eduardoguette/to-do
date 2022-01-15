import React from 'react';

import { Link, Outlet } from 'react-router-dom';

export const Start = () => {
  return (
    <div className='md:grid md:grid-cols-[40%,1fr] h-screen items-center bg-amaranth-50'>
      <aside className='w-full relative h-full md:grid place-items-center hidden '>
        <div className='absolute top-20 left-20'>
          <Link to='/' className='opacity-50 block hover:opacity-100 transition-opacity ease-in-out duration-1500'>
            <img src='/assets/logo.png' alt='Logo To-do' height='20' width='115' className='mb-8' />
          </Link>
          <h1 className='text-2xl font-bold max-w-[300px] text-midnight-500'>Es momento de organizar tu día.</h1>
        </div>
        <img src='/assets/sign-in.png' alt='Sign-in image' className='mt-16' height={400} width={400} />
      </aside>
      <section className='w-full relative flex justify-center flex-col items-center bg-white p-5 md:p-10  mx-auto h-full'>
        <Outlet />
      </section>
    </div>
  );
};
