import React from 'react';
import { useForm } from '../hooks/useForm';
import logoImg from '../../img/logo.png';
import { updatePassword } from '../helpers/todos';
import {  useMutation, useQueryClient } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
export const ChangePassword = ({ token }) => {
  const [{ pass, repeat_pass }, setNewPassWord] = useForm({
    pass: '',
    repeat_pass: '',
  });
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutateAsync, data } = useMutation(updatePassword, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('dataUser');
      queryClient.invalidateQueries('todos');
      navigate('/');
    },
  });
  const handleSubmitChangePass = async (e) => {
    e.preventDefault(); 
    if (pass.trim() === repeat_pass.trim()) mutateAsync({ token, pass });
  };
  return (
    <div className='my-10 bg-white shadow-lg w-80 md:w-96 mx-auto p-5 lg:p-10 rounded-md overflow-hidden'>
      <Link to='/'>
        <img src={logoImg} alt='Logo to-do' className='h-8 mb-8' />
      </Link>
      <h1 className='text-2xl font-bold mb-5'>Cambio de contraseña</h1>
      <form onSubmit={handleSubmitChangePass} className='flex flex-col gap-3'>
        <label className='flex flex-col gap-2' htmlFor='pass'>
          <span className='text-sm'>Nueva contraseña</span>
          <input
            id='pass'
            name='pass'
            value={pass}
            className='py-2 px-4 rounded-md border border-gray-300 focus:border-amaranth-300 focus:outline-none focus:ring focus:ring-amaranth-200 outline-none valid:bg-amaranth-50'
            type='password'
            required
            placeholder='Introduzca su pass'
            onChange={setNewPassWord}
          />
        </label>
        <label className='flex flex-col gap-2' htmlFor='pass'>
          <span className='text-sm'>Repita su nueva contraseña</span>
          <input
            name='repeat_pass'
            value={repeat_pass}
            className='py-2 px-4 rounded-md border border-gray-300 focus:border-amaranth-300 focus:outline-none focus:ring focus:ring-amaranth-200 outline-none valid:bg-amaranth-50'
            type='password'
            required
            placeholder='Repta la contraseña'
            onChange={setNewPassWord}
          />
        </label>
        <button className='px-4 py-2 bg-amaranth-500 hover:bg-amaranth-400 focus:outline-amaranth-200 font-semibold text-white rounded-md mt-5'>Cambiar contraseña</button>
      </form>
    </div>
  );
};
