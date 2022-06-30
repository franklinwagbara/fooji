import useTodosStyles from "./styles/todos.style";
import Editor from "../editor/Editor";

const Todo = ({ id, task, is_completed, type, updateTarget }) => {
  const classes = useTodosStyles({ type, is_completed });

  return (
    <div className={classes.root}>
      <Editor
        id={id}
        value={task}
        is_completed={is_completed}
        type={type}
        updateTarget={updateTarget}
      />
    </div>
  );
};
export default Todo;
