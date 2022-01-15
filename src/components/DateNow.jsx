import { useQueryClient } from 'react-query';
import { getDateNow } from '../helpers';

export const DateNow = () => {
  const queryClient = useQueryClient();
  const [[, data]] = queryClient.getQueriesData('dataUser');
  let fecha = data?.date ?? new Date().toISOString().split('T')[0];
  const handleInputChange = ({ target }) => {
    fecha = target.value;
    queryClient.setQueryData('dataUser', (prevDataUser) => {
      return { ...prevDataUser, date: new Date(fecha).toISOString() };
    });
  };
  const [dia, mes] = getDateNow(data?.date, 'long').split('de');
  return (
    <div className='md:flex justify-between items-end md:my-10 '>
      <h1 className='text-5xl w-60 font-extrabold text-midnight-500 my-8 md:my-0'>{dia + 'de' + mes}</h1>
      <div className='flex '>
        <input
          type='date'
          id='date'
          name='date'
          className='px-4 py-1 border rounded-md border-midnight-500 mb-2 md:my-0'
          onChange={handleInputChange}
          min='2021-01-01'
          max='2024-12-31'
          value={new Date(fecha).toISOString().split('T')[0]}
        />
      </div>
    </div>
  );
};
