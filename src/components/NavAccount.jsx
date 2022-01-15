import React from 'react';
import { NavLink } from 'react-router-dom';
const listMenu = [
  { value: 'Pendientes', path: '/account/to-dos/pending' },
  { value: 'Haciendo', path: '/account/to-dos/doing' },
  { value: 'Completos', path: '/account/to-dos/done' },
  { value: 'Ver todos', path: '/account/to-dos/all' },
];
export const NavAccount = () => {
  return (
    <nav className='py-5'>
      <ul className='flex py-2 gap-5 border-b overflow-x-auto snap-x'>
        {listMenu.map(({ value, path }) => (
          <li className='snap-start' key={path}>
            <NavLink to={path} className={({ isActive }) => (isActive ? 'border-b-2 border-amaranth-400 px-4 py-2 whitespace-pre' : 'hover:bg-amaranth-100 rounded-md px-4 py-2 whitespace-pre')}>
              {value}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
