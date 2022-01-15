import React from 'react'
import { timeSince } from '../helpers'

export const CardTodo = ({...props}) => { 
  return (
    <div>
       <li>
            <article className='border p-5 rounded-md bg-white h-full grid grid-rows-[min(100px,400px),auto] max-w-[400px]'>
              <div>
                <p className=''>{props.task}</p>
              </div>
              <footer className='text-xs flex items-center justify-between'>
                <p className='w-6/12'>{timeSince(props.inserted_at)}</p>
                <div className='mt-3'>
                  {props.doing && <span className='px-2 py-1 rounded-full bg-yellow-200'>Haciendo</span>}
                  {props.done && <span className='px-2 py-1 rounded-full bg-green-200'>Completado</span>}
                  {!props.done && !props.doing && <span className='px-2 py-1 rounded-full bg-amaranth-200 '>Pendiente</span>}
                </div>
              </footer>
            </article>
          </li>
    </div>
  )
}
