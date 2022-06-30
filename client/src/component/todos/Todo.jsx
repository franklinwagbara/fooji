import { Typography, Badge, TextField } from "@material-ui/core";
import useGlobalContext from "../../GlobalContext";
import { useState, useReducer, useEffect } from "react";
import useTodosStyles from "./styles/todos.style";
import Operations from "../operations/Operation";

const Todo = ({ id, task, is_completed, type }) => {
  const { handleComplete, handleDelete, handleEdit } = useGlobalContext();
  const classes = useTodosStyles({ type, is_completed });

  return (
    <div className={classes.root}>
      <Operations
        id={id}
        value={task}
        is_completed={is_completed}
        type={type}
      />
    </div>
  );
};
export default Todo;
