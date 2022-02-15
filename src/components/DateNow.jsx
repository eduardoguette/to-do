import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { getDateNow } from '../helpers';

export const DateNow = () => {
  const queryClient = useQueryClient();
  const [[, data]] = queryClient.getQueriesData('dataUser');
  const dateNow = new Date().toISOString().split('T')[0]
   

  const [date, setDate]  = useState(data?.date?.split('T')[0] || dateNow)
 
  const handleInputChange = ({ target }) => {
    setDate(target.value);
    queryClient.setQueryData('dataUser', (prevDataUser) => {
      return { ...prevDataUser, date: new Date(target.value).toISOString() };
    }); 
    queryClient.invalidateQueries('todos')
  };

  const [dia, mes] = getDateNow(date, 'long').split('de');

  return (
    <div className='items-end justify-between md:flex md:my-10 '>
      <h1 className='my-8 font-serif text-5xl font-extrabold w-60 text-midnight-500 md:my-0'>{dia + 'de' + mes}</h1>
      <div className='flex '>
  
        <input
          type='date'
          id='date'
          name='date'
          className='px-4 py-1 mb-2 bg-white border border-gray-200 rounded-md focus:outline-amaranth-200 md:my-0'
          onChange={handleInputChange}
          min='2021-01-01'
          max='2024-12-31'
          value={date}
        />
      </div>
    </div>
  );
};
