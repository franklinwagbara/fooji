import { TextField, Paper, makeStyles, IconButton } from "@material-ui/core";
import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";
import { useState } from "react";
import useGlobalContext from "../../GlobalContext";
import axiosApi from "../../axiosApi";

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
const CreateForm = ({ type }) => {
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
          message: `Please enter ${
            type && type === "group" ? "group name" : "task description."
          }`,
          type: "error",
        },
      });
    }

    try {
      const data = type && type === "group" ? { name: task } : { task };
      axiosApi
        .post(
          `${type && type === "group" ? "groups" : "todos"}/current`,
          data,
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res);
          getCurrentUser();
          setTask("");
          dispatch({
            type: "SET_ALERT",
            payload: {
              open: true,
              message: `A new ${
                type && type === "group" ? "Group" : "Todo"
              } was created successfully.`,
              type: "success",
            },
          });
        })
        .catch((err) =>
          dispatch({
            type: "SET_ALERT",
            payload: {
              open: true,
              message: `Unable to create a new ${
                type && type === "group" ? "group" : "todo"
              }.`,
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
          message: `Unable to create a new ${
            type && type === "group" ? "group" : "todo"
          }.`,
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
        label={
          type && type === "group"
            ? "Enter Group name"
            : "Enter task description"
        }
        error={error && task === "" ? true : false}
        fullWidth
      />
      <IconButton onClick={(e) => handleSubmit(e)}>
        <AddCircleOutlinedIcon
          color={type && type === "group" ? "secondary" : "primary"}
        />
      </IconButton>
    </Paper>
  );
};

export default CreateForm;
