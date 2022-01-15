import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { updateProfile, uploadAvatar, user } from '../helpers';

import { useForm } from '../hooks/useForm';
export const FormEditProfile = () => {
  const queryClient = useQueryClient();
  const [[, data]] = queryClient.getQueriesData('dataUser');

  const [{ name}, setValues] = useForm({
    name: data?.profile.name,
  });
  const { mutateAsync } = useMutation(updateProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries('dataUser');
    },
  });
  const { mutateAsync: upLoadImg, data: avatar_url } = useMutation(uploadAvatar, {
    onSuccess: (avatar_url) => {
      const id = data.idUser;
      mutateAsync({ name, id, avatar_url });
    },
  });

  const uploadImage = (e) => {
    upLoadImg(e);
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className='mt-2 flex flex-col gap-3 items-start w-full text-sm'>
        <input type='file' placeholder='Seleccionar foto' accept='image/*' onChange={uploadImage} className='hidden' />
        <label htmlFor='name' className='flex gap-3 items-center justify-between w-full'>
          <span className='block font-semibold text-xs w-20'>Nombre</span>
          <input value={name} onChange={setValues} type='text' id='name' required className='bg-gray-50  px-4 py-2 border-b w-full ' name='name' placeholder='Nombre' />
        </label>

        <div className='mt-3 flex flex-col items-center justify-center mx-auto w-full gap-3'>
          <button className='px-4 py-2 bg-gray-200 font-semibold rounded-md w-full' type='submit'>
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};
