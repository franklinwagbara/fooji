import ClearIcon from "@material-ui/icons/Clear";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import useTodosStyles from "../todos/styles/todos.style";
import { Badge } from "@material-ui/core";
import useGlobalContext from "../../GlobalContext";
import AddTodoToGroup from "../todos/AddTodoToGroup";
import PropTypes from "prop-types";

const Operations = ({
  id,
  edited,
  setError,
  is_completed,
  handleComplete,
  handleDelete,
  state,
  type,
  editorDispatch,
}) => {
  const { dispatch } = useGlobalContext();

  const classes = useTodosStyles();
  return (
    <div>
      {!is_completed ? (
        <DoneOutlineIcon
          onClick={() => handleComplete(id, true, type)}
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
            onClick={() => handleComplete(id, false, type)}
            className={classes.clear}
          />
        </span>
      )}
      <EditIcon
        onClick={() => {
          if (edited === "" && state.value !== "close") {
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
        onClick={() => handleDelete(id, type)}
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
  );
};

Operations.propTypes = {
  id: PropTypes.string.isRequired,
  edited: PropTypes.string.isRequired,
  setError: PropTypes.func.isRequired,
  is_completed: PropTypes.bool.isRequired,
  handleComplete: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  editorDispatch: PropTypes.func.isRequired,
};

export default Operations;
