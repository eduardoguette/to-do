import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Start } from '../pages/Start';
import { Account } from '../pages/Account';
import { Layout } from '../components/Layout';
import { useQuery, useQueryClient } from 'react-query';
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
import { MsgUser } from '../components/MsgUser';
import { ChangePassword } from '../components/ChangePassword';
import { FormEditProfile } from '../components/FormEditProfile';

export const Router = () => {
    const { data, isLoading: loading } = useQuery('dataUser', user);
    const { data: todos, isLoading } = useQuery('todos', getTodos);
 
  return (
    <BrowserRouter>
      <MsgUser />
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />}></Route>
        </Route>
        <Route element={<EditProfile />}>
          <Route path='account/edit-profile' element={<FormEditProfile />}></Route>
          <Route path='account/change-password' element={<ChangePassword />}></Route>
          <Route path='account/to-dos/pending' element={<PendingTodos />}></Route>
          <Route path='account/to-dos/doing' element={<DoingTodos />}></Route>
          <Route path='account/to-dos/done' element={<DoneTodos />}></Route>
          <Route path='account/to-dos/all' element={<AllTodos />}></Route>
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
