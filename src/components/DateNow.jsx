import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { getDateNow } from '../helpers';

export const DateNow = () => {
  const queryClient = useQueryClient();
  const [[, data]] = queryClient.getQueriesData('dataUser');
  const [date, setDate]  = useState(data?.date.split('T')[0] || new Date().toISOString.split('T')[0])
 
  const handleInputChange = ({ target }) => {
    setDate(target.value);
    queryClient.setQueryData('dataUser', (prevDataUser) => {
      return { ...prevDataUser, date: new Date(target.value).toISOString() };
    }); 
    queryClient.invalidateQueries('todos')
  };
  const [dia, mes] = getDateNow(date, 'long').split('de');
  return (
    <div className='md:flex justify-between items-end md:my-10 '>
      <h1 className='text-5xl font-serif w-60 font-extrabold text-midnight-500 my-8 md:my-0'>{dia + 'de' + mes}</h1>
      <div className='flex '>
  
        <input
          type='date'
          id='date'
          name='date'
          className='px-4 py-1 border bg-white rounded-md border-gray-200 focus:outline-amaranth-200 mb-2 md:my-0'
          onChange={handleInputChange}
          min='2021-01-01'
          max='2024-12-31'
          value={date}
        />
      </div>
    </div>
  );
};
