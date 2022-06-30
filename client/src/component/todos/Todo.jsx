import { Typography, Badge, TextField } from "@material-ui/core";
import useGlobalContext from "../../GlobalContext";
import { useState, useReducer, useEffect } from "react";
import useTodosStyles from "./styles/todos.style";
import Operations from "../operations/Operation";

const initialEditorState = {
  value: "close",
};

const editorReducer = (state, action) => {
  switch (action.type) {
    case "NEXT":
      if (state.value === "close") return { value: "open" };
      else if (state.value === "open") return { value: "submit" };
      else return { value: "close" };
    default:
      return;
  }
};

const Todo = ({ id, task, is_completed, type }) => {
  const { handleComplete, handleDelete, handleEdit } = useGlobalContext();
  const [editorState, editorDispatch] = useReducer(
    editorReducer,
    initialEditorState
  );
  const [error, setError] = useState(null);
  const [newTask, setNewTask] = useState(task);

  useEffect(() => {
    handleEdit(id, editorState, editorDispatch, newTask, is_completed, "todo");
  }, [editorState]);

  const classes = useTodosStyles({ type, is_completed });

  return (
    <div className={classes.root}>
      {editorState.value !== "open" ? (
        <Typography className={classes.task} component="span">
          {task}
        </Typography>
      ) : (
        <TextField
          style={{ flex: 1 }}
          color="primary"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          error={error}
        />
      )}

      <Operations
        id={id}
        edited={newTask}
        setError={setError}
        is_completed={is_completed}
        handleComplete={handleComplete}
        handleDelete={handleDelete}
        state={editorState}
        type={type}
        editorDispatch={editorDispatch}
      />
    </div>
  );
};
export default Todo;
