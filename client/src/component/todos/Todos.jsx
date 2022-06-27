import useGlobalContext from "../../GlobalContext";
import Todo from "./Todo";

const Todos = () => {
  const { completed_todos, incomplete_todos } = useGlobalContext();
  return (
    <>
      {completed_todos.map((todo) => (
        <Todo
          key={todo._id}
          id={todo._id}
          task={todo.task}
          is_completed={todo.is_completed}
        />
      ))}
      {incomplete_todos.map((todo) => (
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
