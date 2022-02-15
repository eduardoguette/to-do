import { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { Navigate, useLocation } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData('dataUser');
  
  const { pathname } = useLocation();
  localStorage.setItem('lastPathTODO', pathname);
  

  return data?.logged ? children : <Navigate to='/session/sign-in' />;
};
