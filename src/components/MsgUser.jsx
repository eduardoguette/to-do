import React from 'react';
import { useQueryClient } from 'react-query';

export const MsgUser = () => {
  const queryClient = useQueryClient();
  const info = queryClient.getQueryData('dataUser');  
  return (
    <>
      {info?.msg && (
        <div className='fixed left-0 top-0 text-sm bg-white-500 shadow-md text-white bg-amaranth-400 px-5 py-3 w-full z-10'>
          <p>{info?.msg}</p>
        </div>
      )}
    </>
  );
};
