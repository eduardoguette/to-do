import React from 'react';
import { useQueryClient } from 'react-query';
import imgDefaultUser from '/img/default-avatar.png';
export const Profile = () => {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData('dataUser');
  if (!data?.profile) return <p>Aún no has configurado tu perfil</p>;
  return (
    <div className='flex justify-center items-center'>
      <div className='flex border p-5 rounded-md shadow-lg gap-5 w-[min(400px,100%)] '>
        <img src={!data?.avatar ? imgDefaultUser : data.avatar} alt='Imagen perfil' height={100} width={100} className='rounded-full object-cover h-[100px] w-[100px]' />
        <div>
          <h1 className='text-2xl font-bold mb-2'>{data.profile.name}</h1>
          <p>{data.profile.biography}</p>
          <p className='text-sm '>{data.profile.location}</p>
        </div>
      </div>
    </div>
  );
};
