import { motion } from 'framer-motion';
import React from 'react';
import { useQueryClient } from 'react-query';

export const MsgUser = () => {
  const queryClient = useQueryClient();
  const info = queryClient.getQueryData('dataUser');   
  return (
    <>
      {info?.msg && (
        <motion.div initial={{y:"-100px"}} animate={{y:0}} className='fixed top-0 left-0 z-10 w-full px-5 py-3 text-sm text-white shadow-md bg-white-500 bg-amaranth-400'>
          <p>{info?.msg}</p>
        </motion.div>
      )}
    </>
  );
};
