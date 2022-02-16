import { motion } from 'framer-motion';
import React from 'react';
import { timeSince } from '../helpers';
const variantes = {
  hidden: {
    opacity: 0,
    translateY: "-10px"
  },
  visible: ({ delay }) => ({
    opacity: 1,
    translateY: 0,
    transition: {
      delay,
      duration: .5,
    },
  }),
};
export const CardTodo = ({ ...props }) => {
  return (
    <motion.div variants={variantes} custom={{ delay: (props.index + .7) * .02}} initial='hidden' animate='visible' transition={{ type: 'spring' }}>
      <li>
        <article className='border p-5 rounded-md bg-white h-full grid max-w-[400px]'>
          <div>
            <p className=''>{props.task}</p>
          </div>
          <footer className='flex items-center justify-between text-xs'>
            <p className='w-6/12'>{timeSince(props.inserted_at)}</p>
            <div className='mt-3'>
              {props.doing && <span className='px-2 py-1 bg-yellow-200 rounded-full'>Haciendo</span>}
              {props.done && <span className='px-2 py-1 bg-green-200 rounded-full'>Completado</span>}
              {!props.done && !props.doing && <span className='px-2 py-1 rounded-full bg-amaranth-200 '>Pendiente</span>}
            </div>
          </footer>
        </article>
      </li>
    </motion.div>
  );
};
