import CreateForm from "../todos/CreateForm";
import { Paper, Button, Container, makeStyles } from "@material-ui/core";
import { useState, useEffect } from "react";
import Todos from "../todos/Todos";
import useGlobalContext from "../../GlobalContext";
import { useNavigate } from "react-router-dom";
import Groups from "../groups/Groups";

const useStyles = makeStyles((theme) => ({
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

const Main = () => {
  const navigate = useNavigate();

  const { user } = useGlobalContext();

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user]);

  const classes = useStyles();
  return (
    <>
      <Container className={classes.root}>
        <div className={classes.todoContainer}>
          <CreateForm />
          <Paper elevation={4} className={classes.paperTodo}>
            <Todos />
          </Paper>
        </div>
        <Paper elevation={4} className={classes.paperGroup}>
          <CreateForm type="group" />
          <Groups />
        </Paper>
      </Container>
    </>
  );
};

export default Main;
