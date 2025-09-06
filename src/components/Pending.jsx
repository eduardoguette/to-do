import { AnimatePresence } from 'framer-motion'
import { useMemo } from 'react'
import { useQueryClient } from 'react-query'
import { Todo } from './Todo'

export const Pending = () => {
  const queryClient = useQueryClient()
  const [[, data]] = queryClient.getQueriesData('dataUser')
  const [[, [todos]]] = queryClient.getQueriesData('todos')

  console.log(todos)
  const date = new Date(data.date).toLocaleDateString()
  console.log(date)
  const todosFiltered = useMemo(() => {
    return todos.filter(
      (todo) => new Date(todo.inserted_at).toLocaleDateString() === date
    )
  }, [todos])
  todos.forEach((todo) => {
    console.log(new Date(todo.inserted_at).toLocaleDateString(), date)
  })
  return (
    <section>
      <div className="relative">
        <h1 className="relative z-10 pb-1 pr-2 my-4 text-lg font-semibold border-b-2 border-amaranth-400 w-max">
          Tareas pendientes
        </h1>
        <span className="absolute bottom-0 block w-full border-t"></span>
      </div>
      <article className="flex flex-col gap-4">
        <AnimatePresence>
          {todos &&
            todos
              .filter(
                (todo) =>
                  new Date(todo.inserted_at).toLocaleDateString() ===
                  new Date(data.date).toLocaleDateString()
              )
              .map(
                (todo, index) =>
                  !todo.done &&
                  !todo.doing && (
                    <Todo
                      layoutId={todo.id}
                      key={todo.id}
                      {...todo}
                      index={index}
                    />
                  )
              )}
        </AnimatePresence>
      </article>
    </section>
  )
}
