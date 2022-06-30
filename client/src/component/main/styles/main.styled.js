import { makeStyles } from "@material-ui/core";

const useMainStyle = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5),
    maxWidth: 800,
    display: "flex",
    gap: theme.spacing(3),
  },
  todoContainer: {
    width: "60%",
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(5),
  },
  paperTodo: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    padding: theme.spacing(3),
    boxSizing: "border-box",
    minHeight: "60vh",
    "& > *": {
      marginTop: theme.spacing(1),
    },
  },
  paperGroup: {
    display: "flex",
    flexDirection: "column",
    width: "40%",
    minHeight: "60vh",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));
export default useMainStyle;
