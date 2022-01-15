import React from 'react';
import { Spin } from './Spin';

export const Loader = () => {
  return (
    <div className='grid place-items-center min-h-[80vh]'>
      <Spin />
    </div>
  );
};
