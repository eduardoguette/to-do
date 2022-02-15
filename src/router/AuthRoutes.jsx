import { Route, Routes } from 'react-router-dom';
import { Forgot } from '../components/Forgot';
import { SignIn } from '../components/SignIn';
import { SignUp } from '../components/SignUp';
import { HomePublic } from '../pages/HomePublic';
import { NoMatch } from '../pages/NoMatch';
import { Start } from '../pages/Start';

export const AuthRoutes = () => {
  
  return (
    <Routes>
      <Route path='/'  element={<HomePublic />}></Route>
      <Route path='/session' element={<Start />}>
        <Route path='sign-in' element={<SignIn />}></Route>
        <Route path='password_resets' element={<Forgot />}></Route>
        <Route path='sign-up' element={<SignUp />}></Route>
      </Route>
      <Route path='*' element={<NoMatch />}></Route>
    </Routes>
  );
};
