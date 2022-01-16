import { supabase } from './supabaseClient';

export const signUp = async (dataUSer) => {
  const { user, session, error } = await supabase.auth.signUp(dataUSer);
  return [user, session, error];
};

export const logIn = async (dataUSer) => {
  const { user, session, error } = await supabase.auth.signIn(dataUSer);
  return [user, session, error];
};

export const singOut = async () => {
  const { error } = await supabase.auth.signOut();
  return [error];
};
export const deleteUser = async (a, b) => {
  const { user, error } = await supabase.auth.api.deleteUser(a, b);
  return [user, error];
};
export const getTodos = async () => {
  if (!supabase.auth.session()) return;
  const { data, error } = await supabase.from('todos').select();
  return [data, error];
};
export const createTodo = async (newTodo) => {
  console.log(newTodo);
  const { data, error } = await supabase.from('todos').insert(newTodo);
  return [data, error];
};
export const updateTodo = async (todoInfo) => {
  const [change, id] = todoInfo;
  const { data, error } = await supabase.from('todos').update(change).match(id);
  return [data, error];
};
export const deleteTodo = async (id) => {
  const { data, error } = await supabase.from('todos').delete().match(id);
  return [data, error];
};
export const recoveryPassword = async (email) => {
  const { data, error } = supabase.auth.api.resetPasswordForEmail(email);
  return [data, error];
};

export const updatePassword = async ({token, pass}) => {
  const { error, data } = await supabase.auth.api.updateUser(token, {password: pass });
  console.log(token,pass, data, error)
  return [data, error];
};
