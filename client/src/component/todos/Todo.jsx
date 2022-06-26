import { Typography, makeStyles } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import { green } from "@material-ui/core/colors";

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
  },
  clear: {
    color: theme.palette.primary.main,
  },
  done: {
    color: green[800],
  },
  edit: {
    color: theme.palette.secondary.main,
  },
  delete: {
    color: theme.palette.primary.dark,
  },
}));

const Todo = ({ id, task, is_completed = true }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography
        style={{
          flex: 1,
          overflow: "hidden",
          whiteSpace: "nowrap",
          marginRight: "10px",
        }}
        component="span"
      >
        {task}
      </Typography>
      <span>
        {is_completed ? (
          <DoneOutlineIcon className={classes.done} />
        ) : (
          <ClearIcon className={classes.clear} />
        )}
        <EditIcon className={classes.edit} />
        <DeleteIcon className={classes.delete} />
      </span>
    </div>
  );
};
export default Todo;
