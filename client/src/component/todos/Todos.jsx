import Todo from "./Todo";

const todos = [
  { id: 1, task: "new todosssssssssssssssssssssssssss" },
  { id: 2, task: "new todo" },
  { id: 3, task: "new todo" },
  { id: 4, task: "new todo" },
];

const Todos = () => {
  return (
    <>
      {todos.map((todo) => (
        <Todo key={todo.id} id={todo.id} task={todo.task} />
      ))}
    </>
  );
};

export default Todos;
