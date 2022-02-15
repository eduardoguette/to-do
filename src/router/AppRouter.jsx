import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { useQuery, useQueryClient } from 'react-query';
import { user } from '../helpers';
import { NoMatch } from '../pages/NoMatch';
import { MsgUser } from '../components/MsgUser';
import { AuthRoutes } from './AuthRoutes';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { AccountRoute } from './AccountRoute';
import { Loader } from '../components/Loader'; 
import { getTodos } from '../helpers/todos';

export const AppRouter = () => { 
  const { isLoading } = useQuery('dataUser', user); 
  const { isLoading:loading } = useQuery('todos', getTodos); 
 
  if (isLoading || loading  ) return <Loader />;
  return (
    <BrowserRouter>
      <MsgUser />
      <Routes>
        <Route
          path='/*'
          element={
            <PublicRoute>
              <AuthRoutes />
            </PublicRoute>
          }
        ></Route>
        <Route
          path='/home'
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path='/account/*'
          element={
            <PrivateRoute>
              <AccountRoute />
            </PrivateRoute>
          }
        ></Route>
        <Route path='*' element={<NoMatch />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
