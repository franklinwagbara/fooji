import useGlobalContext from "../../GlobalContext";
import Todo from "./Todo";

const Todos = () => {
  const { completed_todos, incomplete_todos } = useGlobalContext();
  const todos = incomplete_todos.concat(completed_todos);

  if (todos.length === 0) return <div>No Todos to display.</div>;
  return (
    <>
      {todos.map((todo) => (
        <Todo
          key={todo._id}
          id={todo._id}
          task={todo.task}
          is_completed={todo.is_completed}
        />
      ))}
    </>
  );
};

export default Todos;
