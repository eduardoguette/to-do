import { useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import { updateProfile, uploadAvatar } from '../helpers';
import { supabase } from '../helpers/supabaseClient';
import { useForm } from '../hooks/useForm';
import imgDefaultUser from '/img/default-avatar.png';

export const FormEditProfile = () => {
  const queryClient = useQueryClient();

  const signUpData = queryClient.getQueryData('dataUser');
  const [pathImg, setPathImg] = useState(signUpData?.profile?.avatar_url);

  const [{ name, biography, location, avatar }, setValues] = useForm({
    name: signUpData?.profile?.name || '',
    biography: signUpData?.profile?.biography || '',
    avatar: signUpData?.profile?.avatar_url || null,
    location: signUpData?.profile?.location || '',
  });

  const idUser = supabase.auth.session()?.user.id;

  const { mutateAsync: updateUser } = useMutation(updateProfile, {
    onSuccess: () => {
      queryClient.refetchQueries('dataUser');
      queryClient.refetchQueries('todos');
    },
  });

  const { mutateAsync: upLoadImg, data: avatar_url } = useMutation(uploadAvatar, {
    onSuccess: (avatar_url) => {
      toast.remove();
      setPathImg(avatar_url);
      updateUser({ name, id: idUser, avatar_url, location, biography });
      toast.success('¡Tu perfil ha sido actualizado!');
    },
  });
  const handleInputImgChange = (event) => {
    toast.loading('Subiendo imagen...');
    upLoadImg(event);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length > 3) {
      updateUser(
        { name, id: idUser, avatar_url: pathImg, location, biography },
        {
          onSuccess: () => {
            toast.remove();
            toast.success('¡Perfil actualizado!', {
              duration: 2000,
              icon: '😀',
            });
          },
        }
      );
    } else {
      toast.error('El nombre debe tener más de 3 caracteres');
    }
  };
  return (
    <section className='w-[min(450px,100%)] mx-auto'>
      <div className='flex items-center gap-5 '>
        <div className='w-full'>
          {signUpData?.access_token || signUpData?.estado?.includes('noProfile') ? (
            <>
              <h1 className='text-xl font-bold md:text-4xl'>¡Bienvenido!</h1>
              <p className='my-5 text-lg font-semibold text-gray-600 md:text-xl'>Completemos algunos datos para tu perfil</p>
            </>
          ) : (
            <></>
          )}
          <label className='relative flex flex-col items-center justify-center mx-auto my-4 cursor-pointer group w-max'>
            <div className='relative mx-auto'>
              <img src={!signUpData?.avatar ? imgDefaultUser : signUpData.avatar} alt='Imagen perfil' height={150} width={150} className='rounded-full object-cover h-[150px] w-[150px]' />
              <input type='file' placeholder='Seleccionar foto' accept='image/*' onChange={handleInputImgChange} className='hidden' />
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='absolute top-0 bottom-0 left-0 right-0 z-10 block w-6 h-6 m-auto opacity-0 group-hover:opacity-100'
                fill='none'
                viewBox='0 0 24 24'
                stroke='white'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                />
              </svg>
              <div className='absolute inset-0 bg-gray-800 bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100'></div>
            </div>
            <p className='w-full my-2 text-xs font-bold text-center text-amaranth-500'>Cambiar imagen de perfil</p>
          </label>
        </div>
      </div>
      <form onSubmit={handleSubmit} className='flex flex-col items-start w-full gap-5 mt-2 text-sm'>
        <label className='flex flex-col w-full gap-2' htmlFor='email'>
          <span className='text-sm font-semibold'>
            Nombre <span className=' text-amaranth-500'>*</span>
          </span>
          <input
            id='name'
            name='name'
            value={name}
            className='px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-amaranth-300 focus:outline-none focus:ring focus:ring-amaranth-200 valid:bg-amaranth-50'
            type='name'
            required
            placeholder='Introduzca su Nombre'
            onChange={setValues}
          />
        </label>
        <label className='flex flex-col w-full gap-2' htmlFor='location'>
          <span className='text-sm font-semibold'>Introduzca su localidad</span>
          <input
            id='location'
            name='location'
            value={location}
            className='px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-amaranth-300 focus:outline-none focus:ring focus:ring-amaranth-200 valid:bg-amaranth-50'
            type='text'
            placeholder='Introduzca su localidad'
            onChange={setValues}
          />
        </label>
        <label className='flex flex-col w-full gap-2' htmlFor='biography'>
          <span className='text-sm font-semibold'>Biografía</span>
          <textarea
            id='biography'
            name='biography'
            value={biography}
            className='px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-amaranth-300 focus:outline-none focus:ring focus:ring-amaranth-200 valid:bg-amaranth-50'
            type='biography'
            placeholder='Introduzca su biografía'
            onChange={setValues}
          ></textarea>
        </label>

        <button type='submit' className='px-4 py-2 mt-5 font-semibold text-white rounded-md bg-amaranth-500 focus:outline-amaranth-200'>
          Guardar
        </button>
      </form>
    </section>
  );
};
