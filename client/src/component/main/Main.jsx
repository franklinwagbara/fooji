import { Paper, Button, Container } from "@material-ui/core";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreateForm from "../todos/CreateForm";
import useGlobalContext from "../../GlobalContext";
import Todos from "../todos/Todos";
import Groups from "../groups/Groups";
import useMainStyle from "./styles/main.styled";

const Main = () => {
  const navigate = useNavigate();

  const { user } = useGlobalContext();

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user]);

  const classes = useMainStyle();
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
