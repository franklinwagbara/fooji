import { useState, useReducer, useEffect } from "react";
import { Badge, Typography, TextField } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import PropTypes from "prop-types";
import useTodosStyles from "../todos/styles/todos.style";
import useGlobalContext from "../../GlobalContext";
import AddTodoToGroup from "../todos/AddTodoToGroup";

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

const Editor = ({
  id,
  value,
  is_completed,
  type,
  deleteTarget,
  updateTarget,
}) => {
  const { dispatch, handleComplete, handleDelete, handleEdit } =
    useGlobalContext();
  const [editorState, editorDispatch] = useReducer(
    editorReducer,
    initialEditorState
  );
  const [error, setError] = useState(null);
  const [newValue, setnewValue] = useState(value);

  useEffect(() => {
    handleEdit(
      id,
      editorState,
      editorDispatch,
      newValue,
      is_completed,
      type,
      updateTarget
    );
  }, [editorState]);

  const classes = useTodosStyles({ type, is_completed });
  return (
    <>
      {editorState.value !== "open" ? (
        <Typography className={classes.task} component="span">
          {value}
        </Typography>
      ) : (
        <TextField
          style={{ flex: 1 }}
          color="primary"
          value={newValue}
          onChange={(e) => setnewValue(e.target.value)}
          error={error}
        />
      )}

      <div>
        {!is_completed ? (
          <DoneOutlineIcon
            onClick={() => handleComplete(id, true, type, updateTarget)}
            className={classes.done}
          />
        ) : (
          <span>
            <Badge
              color="primary"
              className={classes.badge}
              badgeContent="Done!"
            />
            <ClearIcon
              onClick={() => handleComplete(id, false, type, updateTarget)}
              className={classes.clear}
            />
          </span>
        )}
        <EditIcon
          onClick={() => {
            if (newValue === "" && editorState.value !== "close") {
              setError("Task description cannot be empty.");
              dispatch({
                type: "SET_ALERT",
                payload: {
                  open: true,
                  message: "Something went wrong while trying to update todo.",
                  type: "error",
                },
              });
            } else editorDispatch({ type: "NEXT" });
          }}
          className={classes.edit}
        />
        <DeleteIcon
          onClick={() => handleDelete(id, type, deleteTarget)}
          className={classes.delete}
        />
        {type && type === "group" ? (
          ""
        ) : (
          <span>
            <AddTodoToGroup todo_id={id} />
          </span>
        )}
      </div>
    </>
  );
};

Editor.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  is_completed: PropTypes.bool.isRequired,
  type: PropTypes.string,
  deleteTarget: PropTypes.string,
  updateTarget: PropTypes.string,
};

export default Editor;
