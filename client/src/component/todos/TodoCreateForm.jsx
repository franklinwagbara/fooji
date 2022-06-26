import { TextField, Paper, makeStyles, IconButton } from "@material-ui/core";
import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";
import { useState } from "react";

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
  const classes = useStyles();
  return (
    <Paper className={classes.createForm}>
      <TextField
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={classes.textField}
        variant="outlined"
        label="Enter task description"
        fullWidth
      />
      <IconButton onClick={(e) => onSubmit(e)}>
        <AddCircleOutlinedIcon color="primary" />
      </IconButton>
    </Paper>
  );
};

export default TodoCreateForm;
