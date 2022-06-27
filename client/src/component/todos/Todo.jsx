import { Typography, makeStyles, Badge, IconButton } from "@material-ui/core";
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
    transition: "backdrop-filter 0.3s",

    "&:hover": {
      backdropFilter: "brightness(80%)",
    },
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
  badge: {
    transform: "translate(-30px, -20px)",
    "& > .MuiBadge-colorPrimary": {
      backgroundColor: green[500],
    },
  },
}));

const Todo = ({ id, task, is_completed }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography
        style={{
          flex: 1,
          overflow: "hidden",
          whiteSpace: "nowrap",
          marginRight: "10px",
          textDecoration: !is_completed ? "line-through" : "",
          fontStyle: !is_completed ? "italic" : "",
        }}
        component="span"
      >
        {task}
      </Typography>
      <div>
        {is_completed ? (
          <DoneOutlineIcon className={classes.done} />
        ) : (
          <span>
            <Badge
              color="primary"
              className={classes.badge}
              badgeContent="Done!"
            />
            <ClearIcon
              className={classes.clear}
              onClick={() => alert("click me")}
            />
          </span>
        )}
        <EditIcon className={classes.edit} />
        <DeleteIcon className={classes.delete} />
      </div>
    </div>
  );
};
export default Todo;
