import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Start } from '../pages/Start';
import { Account } from '../pages/Account';
import { Layout } from '../components/Layout';
import { useQuery } from 'react-query';
import { user } from '../helpers';
import { Loader } from '../components/Loader';
import { Forgot } from '../components/Forgot';
import { SignIn } from '../components/SignIn';
import { SignUp } from '../components/SignUp';
import { NoMatch } from '../pages/NoMatch';
import { AllTodos } from '../components/AllTodos';
import { PendingTodos } from '../components/PendingTodos';
import { DoingTodos } from '../components/DoingTodos';
import { DoneTodos } from '../components/DoneTodos';
import { getTodos } from '../helpers/todos';
import { EditProfile } from '../components/EditProfile';
import { Profile } from '../components/Profile';

export const Router = () => {
  const { data } = useQuery('dataUser', user);
  const { data: todos, isLoading } = useQuery('todos', getTodos);
  
  if (isLoading && data?.idUser) return <Loader />;
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path='account' element={ <Account />}>
            <Route path='to-dos/all' element={<AllTodos />}></Route>
            <Route path='to-dos/pending' element={<PendingTodos />}></Route>
            <Route path='to-dos/doing' element={<DoingTodos />}></Route>
            <Route path='to-dos/done' element={<DoneTodos />}></Route>
          </Route>
          <Route path='/account/edit-profile' element={<EditProfile />}></Route>
          <Route path='/account/view-profile' element={<Profile />}></Route>
        </Route>
        <Route path='/session' element={<Start />}>
          <Route path='sign-in' element={<SignIn />}></Route>
          <Route path='password_resets' element={<Forgot />}></Route>
          <Route path='sign-up' element={<SignUp />}></Route>
        </Route>
        <Route path='*' element={<NoMatch />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
