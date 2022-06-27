import {
  Typography,
  makeStyles,
  Badge,
  IconButton,
  TextField,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import { green } from "@material-ui/core/colors";
import useGlobalContext from "../../GlobalContext";
import axiosApi from "./../../axiosApi";
import { useState, useReducer, useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "3.5rem",
    display: "flex",
    alignItems: "center",
    width: "100%",
    border: "3px solid",
    borderColor: theme.palette.primary.light,
    boxSizing: "border-box",
    overflow: "hidden",
    padding: theme.spacing(3),
    borderRadius: "1rem",
    transition: "backdrop-filter 0.3s",

    "&:hover": {
      backdropFilter: "brightness(80%)",
    },
  },
  clear: {
    color: theme.palette.primary.main,
    cursor: "pointer",
  },
  done: {
    color: green[800],
    cursor: "pointer",
  },
  edit: {
    color: theme.palette.secondary.main,
    cursor: "pointer",
  },
  delete: {
    color: theme.palette.primary.dark,
    cursor: "pointer",
  },
  badge: {
    transform: "translate(-30px, -20px)",
    "& > .MuiBadge-colorPrimary": {
      backgroundColor: green[500],
    },
  },
}));

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

const Todo = ({ id, task, is_completed }) => {
  const { getCurrentUser, dispatch } = useGlobalContext();
  const [editorState, editorDispatch] = useReducer(
    editorReducer,
    initialEditorState
  );
  const [error, setError] = useState(null);
  const [newTask, setNewTask] = useState(task);

  useEffect(() => {
    handleEdit();
  }, [editorState]);

  const handleComplete = (completed) => {
    try {
      const res = axiosApi
        .put(
          `todos/${id}/${completed ? "complete" : "incomplete"}`,
          {},
          { withCredentials: true }
        )
        .then((res) => {
          getCurrentUser();
          dispatch({
            type: "SET_ALERT",
            payload: {
              open: true,
              message: "Todo completion status update was successful.",
              type: "success",
            },
          });
        })
        .catch((error) => {
          console.log(error?.response.data);
          dispatch({
            type: "SET_ALERT",
            payload: {
              open: true,
              message:
                "Something went while trying to update todo completion status.",
              type: "error",
            },
          });
        });
    } catch (error) {
      console.log(error?.response.data);
      dispatch({
        type: "SET_ALERT",
        payload: {
          open: true,
          message:
            "Something went while trying to update todo completion status.",
          type: "error",
        },
      });
    }
  };

  const handleDelete = () => {
    try {
      const res = axiosApi
        .delete(`todos/${id}`, { withCredentials: true })
        .then((res) => {
          getCurrentUser();
          dispatch({
            type: "SET_ALERT",
            payload: {
              open: true,
              message: "Todo deletion was successful.",
              type: "success",
            },
          });
        })
        .catch((error) => {
          console.log(error?.response.data);
          dispatch({
            type: "SET_ALERT",
            payload: {
              open: true,
              message: "Something went while trying to delete todo.",
              type: "error",
            },
          });
        });
    } catch (error) {
      console.log(error?.response.data);
      dispatch({
        type: "SET_ALERT",
        payload: {
          open: true,
          message: "Something went while trying to delete todo.",
          type: "error",
        },
      });
    }
  };

  const handleEdit = () => {
    if (editorState.value === "submit") {
      try {
        axiosApi
          .put(
            `todos/${id}`,
            {
              task: newTask,
              is_completed,
            },
            { withCredentials: true }
          )
          .then((res) => {
            getCurrentUser();
            dispatch({
              type: "SET_ALERT",
              payload: {
                open: true,
                message: "Todo update was successful.",
                type: "success",
              },
            });
          })
          .catch((error) => {
            console.log(error);
            dispatch({
              type: "SET_ALERT",
              payload: {
                open: true,
                message: "Something went wrong while trying to update todo.",
                type: "error",
              },
            });
          });
      } catch (error) {
        console.log(error.response.data);
        dispatch({
          type: "SET_ALERT",
          payload: {
            open: true,
            message: "Something went wrong while trying to update todo.",
            type: "error",
          },
        });
      }

      editorDispatch({ type: "NEXT" });
    }
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      {editorState.value !== "open" ? (
        <Typography
          style={{
            flex: 1,
            overflow: "hidden",
            whiteSpace: "nowrap",
            marginRight: "10px",
            textDecoration: is_completed ? "line-through" : "",
            fontStyle: is_completed ? "italic" : "",
          }}
          component="span"
        >
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

      <div>
        {!is_completed ? (
          <DoneOutlineIcon
            onClick={() => handleComplete(true)}
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
              onClick={() => handleComplete(false)}
              className={classes.clear}
            />
          </span>
        )}
        <EditIcon
          onClick={() => {
            if (newTask === "" && editorState.value !== "close") {
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
        <DeleteIcon onClick={() => handleDelete()} className={classes.delete} />
      </div>
    </div>
  );
};
export default Todo;
