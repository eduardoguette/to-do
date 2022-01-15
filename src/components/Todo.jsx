import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deleteTodo, getTodos, updateTodo } from '../helpers/todos';

export const Todo = ({ id, task, user_id, done, doing, inserted_at }) => {
  const queryClient = useQueryClient();   
 
  const [showMenu, setShowMenu] = useState(false);
  const { mutateAsync } = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos')
    },
  });
  const { mutateAsync: updateTask } = useMutation(updateTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos')
    },
  });

  const handleDone = () => {
    updateTask([{ done: true, doing: false }, { id }]);
  };
  const handleDoign = () => {
    updateTask([{ done: false, doing: true }, { id }]);
  };
  const handlePending = () => {
    updateTask([{ done: false, doing: false }, { id }]);
  };
  const handleDelete = () => {
    mutateAsync({ id, task, user_id, done, doing });
  };
  return (
    <div className='grid grid-cols-[1fr,2rem] gap-4 py-2 rounded-md items-center justify-center  w-full bg-white pl-4 pr-2 shadow-md'>
      <div className='w-full overflow-wrap-any whitespace-[breack-spaces] rounded-md' id={id} data-date={inserted_at}>
        {task}
      </div>
      <div className='relative flex-col flex items-center justify-center'>
        <button className='hover:bg-gray-100 rounded-md p-1' onClick={() => setShowMenu(!showMenu)}>
          <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 align-middle' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z'
            />
          </svg>
        </button>
        {showMenu && (
          <ul className='absolute bg-white right-0 border shadow-md  rounded-md top-[100%] z-20 overflow-hidden' onClick={() => setShowMenu(!showMenu)}>
            {(doing || done) && (
              <li>
                <button className='flex items-center hover:bg-gray-100 text-sm gap-3 py-2 w-full px-4 text-left' onClick={handlePending}>
                  <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
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
                <button className='flex items-center hover:bg-gray-100 text-sm gap-3 py-2 w-full px-4 text-left' onClick={handleDoign}>
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='h-5 w-5'>
                    <path fill='none' d='M0 0H24V24H0z'></path>
                    <path d='M16 2v2h-1v3.243c0 1.158.251 2.301.736 3.352l4.282 9.276c.347.753.018 1.644-.734 1.99-.197.092-.411.139-.628.139H5.344c-.828 0-1.5-.672-1.5-1.5 0-.217.047-.432.138-.629l4.282-9.276C8.749 9.545 9 8.401 9 7.243V4H8V2h8zm-2.612 8.001h-2.776c-.104.363-.23.721-.374 1.071l-.158.361L6.125 20h11.749l-3.954-8.567c-.214-.464-.392-.943-.532-1.432zM11 7.243c0 .253-.01.506-.029.758h2.058c-.01-.121-.016-.242-.021-.364L13 7.243V4h-2v3.243z'></path>
                  </svg>{' '}
                  Haciendo
                </button>
              </li>
            )}
            {(doing || !done) && (
              <li>
                <button className='flex items-center hover:bg-gray-100 text-sm gap-3 py-2 w-full px-4 text-left' onClick={handleDone}>
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='h-4 w-4 pointer-events-none'>
                    <path fill='none' d='M0 0h24v24H0z'></path>
                    <path d='M11.602 13.76l1.412 1.412 8.466-8.466 1.414 1.414-9.88 9.88-6.364-6.364 1.414-1.414 2.125 2.125 1.413 1.412zm.002-2.828l4.952-4.953 1.41 1.41-4.952 4.953-1.41-1.41zm-2.827 5.655L7.364 18 1 11.636l1.414-1.414 1.413 1.413-.001.001 4.951 4.951z'></path>
                  </svg>{' '}
                  Completado
                </button>
              </li>
            )}
            <li>
              <button onClick={handleDelete} className='flex items-center hover:bg-gray-100 text-sm gap-3 py-2  text-left  w-full px-4'>
                <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 pointer-events-none' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
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
          </ul>
        )}
      </div>
      {showMenu && <div className='fixed inset-0 h-full w-full z-10' onClick={() => setShowMenu(!showMenu)}></div>}
    </div>
  );
};
