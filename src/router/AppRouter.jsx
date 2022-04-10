import { Toaster } from 'react-hot-toast';
import { useQuery } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Loader } from '../components/Loader';
import { user } from '../helpers';
import { getTodos } from '../helpers/todos';
import { NoMatch } from '../pages/NoMatch';
import { AccountRoute } from './AccountRoute';
import { AuthRoutes } from './AuthRoutes';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
  const { isLoading } = useQuery('dataUser', user);
  const { isLoading: loading } = useQuery('todos', getTodos); 
  if (isLoading || loading) return <Loader />;
  return (
    <BrowserRouter>
     <Toaster/>
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
