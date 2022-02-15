import { Route, Routes } from 'react-router-dom';
import { AllTodos } from '../components/AllTodos';
import { ChangePassword } from '../components/ChangePassword';
import { DoingTodos } from '../components/DoingTodos';
import { DoneTodos } from '../components/DoneTodos';
import { EditProfile } from '../components/EditProfile';
import { FormEditProfile } from '../components/FormEditProfile';
import { PendingTodos } from '../components/PendingTodos';

export const AccountRoute = () => {
  return (
    <Routes>
      <Route element={<EditProfile />}>
        <Route path='edit-profile' element={<FormEditProfile />}></Route>
        <Route path='change-password' element={<ChangePassword />}></Route>
        <Route path='to-dos/pending' element={<PendingTodos />}></Route>
        <Route path='to-dos/doing' element={<DoingTodos />}></Route>
        <Route path='to-dos/done' element={<DoneTodos />}></Route>
        <Route path='to-dos/all' element={<AllTodos />}></Route>
      </Route>
    </Routes>
  );
};
