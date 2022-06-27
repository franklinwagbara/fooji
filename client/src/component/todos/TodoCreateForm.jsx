import { TextField, Paper, makeStyles, IconButton } from "@material-ui/core";
import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";
import { useState } from "react";
import useGlobalContext from "../../GlobalContext";
import axiosApi from "./../../axiosApi";

const useStyles = makeStyles((theme) => ({
  createForm: {
    display: "flex",
    borderRadius: theme.spacing(3),
  },
  textField: {
    borderRadius: "2rem",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: "2rem",
      },
    },
  },
}));
const TodoCreateForm = ({ value, setValue, onSubmit }) => {
  const [task, setTask] = useState("");
  const [error, setError] = useState(null);

  const { dispatch, getCurrentUser } = useGlobalContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (task === "") {
      setError({ task: "Task description cannot be empty." });
      return dispatch({
        type: "SET_ALERT",
        payload: {
          open: true,
          message: "Please enter task description.",
          type: "error",
        },
      });
    }

    try {
      axiosApi
        .post("todos/current", { task }, { withCredentials: true })
        .then((res) => {
          console.log(res);
          getCurrentUser();
          dispatch({
            type: "SET_ALERT",
            payload: {
              open: true,
              message: "A new Todo was created successfully.",
              type: "success",
            },
          });
        })
        .catch((err) =>
          dispatch({
            type: "SET_ALERT",
            payload: {
              open: true,
              message: "Unable to create new todo.",
              type: "error",
            },
          })
        );
    } catch (error) {
      console.log(error?.response.data);
      dispatch({
        type: "SET_ALERT",
        payload: {
          open: true,
          message: "Unable to create new todo.",
          type: "error",
        },
      });
    }
  };

  const classes = useStyles();
  return (
    <Paper className={classes.createForm}>
      <TextField
        color="secondary"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className={classes.textField}
        variant="outlined"
        label="Enter task description"
        error={error && task === "" ? true : false}
        fullWidth
      />
      <IconButton onClick={(e) => handleSubmit(e)}>
        <AddCircleOutlinedIcon color="primary" />
      </IconButton>
    </Paper>
  );
};

export default TodoCreateForm;
