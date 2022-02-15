import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deleteTodo, getTodos, updateTodo } from '../helpers/todos';




export const Todo = ({ id, task, user_id, done, doing, inserted_at }) => {
  const queryClient = useQueryClient();
  const [todos] = queryClient.getQueryData('todos');
  const [showMenu, setShowMenu] = useState(false);
  const { mutateAsync } = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
    },
  });
  const { mutateAsync: updateTask } = useMutation(updateTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
    },
  });

  const handleDone = () => {
    queryClient.setQueryData('todos', ([todos]) => [todos.map((todo) => (todo.id === id ? { ...todos, done: true, doing: false } : todo))]);
    updateTask([{ done: true, doing: false }, { id }]);
  };
  const handleDoign = () => {
    queryClient.setQueryData('todos', ([todos]) => [todos.map((todo) => (todo.id === id ? { ...todos, done: false, doing: true } : todo))]);
    updateTask([{ done: false, doing: true }, { id }]);
  };
  const handlePending = () => {
    queryClient.setQueryData('todos', ([todos]) => [todos.map((todo) => (todo.id === id ? { ...todos, done: false, doing: false } : todo))]);
    updateTask([{ done: false, doing: false }, { id }]);
  };
  const handleDelete = () => {
    queryClient.setQueryData('todos', ([todos]) => [todos.filter((todo) => todo.id !== id)]);
    mutateAsync({ id, task, user_id, done, doing });
  };
  return (
    <motion.div
      layoutId={id}
      initial={{ y: '-10px', opacity: 0 }}
      exit={{ y: '-10px', opacity: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', duration: 0.5 }}
      className='grid grid-cols-[1fr,2rem] gap-4 py-2 rounded-md items-center justify-center w-full bg-white pl-4 pr-2 shadow-md'
    >
      <div className='w-full overflow-wrap-any whitespace-[breack-spaces] rounded-md' id={id} data-date={inserted_at}>
        {task}
      </div>
      <div className='relative flex flex-col items-center justify-center'>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className='p-1 rounded-md hover:bg-gray-100' onClick={() => setShowMenu(!showMenu)}>
          <svg xmlns='http://www.w3.org/2000/svg' className='w-6 h-6 align-middle' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z'
            />
          </svg>
        </motion.button>
        <AnimatePresence>
          {showMenu && (
            <motion.ul
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, translateY: '0' }}
              transition={{ type: 'spring', duration: 0.5 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className='absolute bg-white right-0 border shadow-md  rounded-md top-[100%] z-20 overflow-hidden'
              onClick={() => setShowMenu(!showMenu)}
            >
              {(doing || done) && (
                <li>
                  <button className='flex items-center w-full gap-3 px-4 py-2 text-sm text-left hover:bg-amaranth-100' onClick={handlePending}>
                    <svg xmlns='http://www.w3.org/2000/svg' className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
                      />
                    </svg>
                    Pendiente
                  </button>
                </li>
              )}
              {((!doing && !done) || done) && (
                <li>
                  <button className='flex items-center gap-3 px-4 py-2 text-sm text-left w-max hover:bg-amaranth-100' onClick={handleDoign}>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='w-5 h-5'>
                      <path fill='none' d='M0 0H24V24H0z'></path>
                      <path d='M16 2v2h-1v3.243c0 1.158.251 2.301.736 3.352l4.282 9.276c.347.753.018 1.644-.734 1.99-.197.092-.411.139-.628.139H5.344c-.828 0-1.5-.672-1.5-1.5 0-.217.047-.432.138-.629l4.282-9.276C8.749 9.545 9 8.401 9 7.243V4H8V2h8zm-2.612 8.001h-2.776c-.104.363-.23.721-.374 1.071l-.158.361L6.125 20h11.749l-3.954-8.567c-.214-.464-.392-.943-.532-1.432zM11 7.243c0 .253-.01.506-.029.758h2.058c-.01-.121-.016-.242-.021-.364L13 7.243V4h-2v3.243z'></path>
                    </svg>
                    En proceso
                  </button>
                </li>
              )}
              {(doing || !done) && (
                <li>
                  <button className='flex items-center w-full gap-3 px-4 py-2 text-sm text-left hover:bg-amaranth-100' onClick={handleDone}>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='w-4 h-4 pointer-events-none'>
                      <path fill='none' d='M0 0h24v24H0z'></path>
                      <path d='M11.602 13.76l1.412 1.412 8.466-8.466 1.414 1.414-9.88 9.88-6.364-6.364 1.414-1.414 2.125 2.125 1.413 1.412zm.002-2.828l4.952-4.953 1.41 1.41-4.952 4.953-1.41-1.41zm-2.827 5.655L7.364 18 1 11.636l1.414-1.414 1.413 1.413-.001.001 4.951 4.951z'></path>
                    </svg>{' '}
                    Completado
                  </button>
                </li>
              )}
              <li>
                <button onClick={handleDelete} className='flex items-center w-full gap-3 px-4 py-2 text-sm text-left hover:bg-amaranth-100'>
                  <svg xmlns='http://www.w3.org/2000/svg' className='w-4 h-4 pointer-events-none' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                    ></path>
                  </svg>
                  Eliminar
                </button>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
      {showMenu && <div className='fixed inset-0 z-10 w-full h-full' onClick={() => setShowMenu(!showMenu)}></div>}
    </motion.div>
  );
};
