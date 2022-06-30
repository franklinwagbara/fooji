import { green, purple } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

const useTodosStyles = makeStyles((theme) => ({
  root: {
    height: (props) =>
      props.type && props.type === "in_group" ? "2rem" : "3.5rem",
    display: "flex",
    alignItems: "center",
    width: "100%",
    border: (props) =>
      props.type && props.type === "in_group" ? "2px solid" : "3px solid",
    borderColor: (props) =>
      props.type && props.type === "in_group"
        ? "gray"
        : theme.palette.primary.light,
    boxSizing: "border-box",
    overflow: "hidden",
    padding: theme.spacing(3),
    borderRadius: "1rem",
    transition: "backdrop-filter 0.3s",

    "&:hover": {
      backdropFilter: "brightness(80%)",
    },
  },
  task: {
    flex: 1,
    overflow: "hidden",
    whiteSpace: "nowrap",
    marginRight: "10px",
    textDecoration: (props) => (props.is_completed ? "line-through" : ""),
    fontStyle: (props) => (props.is_completed ? "italic" : ""),
  },
  clear: {
    color: theme.palette.primary.main,
    cursor: "pointer",
  },
  done: {
    color: green[800],
    cursor: "pointer",
  },
  editDone: {
    color: purple[500],
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
export default useTodosStyles;
