 
import queryString from 'query-string';
import {  useQueryClient } from 'react-query';
import { Navigate, useLocation } from 'react-router-dom'; 

export const PublicRoute = ({ children }) => {
  
  const queryClient = useQueryClient();
  const location = useLocation();
  const { access_token, type = '' } = queryString.parse(location.hash.replace('#', '?')); 

  if (type.includes('recovery') || type.includes('magiclink')) { 
    queryClient.setQueryData('dataUser', (prev) => (prev = { ...prev, access_token, logged: true }));
    return <Navigate to='/account/change-password' />;
  } 
  if(type.includes('signup') || queryClient.getQueryData('dataUser') === "noProfile"){
    queryClient.setQueryData('dataUser', (prev) => (prev = { ...prev, access_token, logged: true }));
    return <Navigate to="/account/edit-profile"/>
  } 
 
 
  const userData = queryClient.getQueryData('dataUser');
  return !userData?.logged ? children : <Navigate to='/home' />;
};
