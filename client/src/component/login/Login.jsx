import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosApi from "../../axiosApi";
import useGlobalContext from "../../GlobalContext";
import { axios } from "axios";
import validateLogin from "./../../validation/validateLogin";
import extractErrors from "./../../validation/extractErrors";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(5),
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    width: "25rem",
    padding: "1rem",
  },
}));

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const { user, getCurrentUser, dispatch } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    const { error } = validateLogin(data);

    if (error) {
      return setErrors(extractErrors(error));
    }
    try {
      setLoading(true);

      const res = await axiosApi.post("auth/login", data, {
        withCredentials: true,
      });

      dispatch({
        type: "SET_ALERT",
        payload: {
          open: true,
          message: "You've logged in successfully.",
          type: "success",
        },
      });
      getCurrentUser();
      setLoading(false);
    } catch (error) {
      dispatch({
        type: "SET_ALERT",
        payload: {
          open: true,
          message:
            "Something went wrong while trying to log you in. Ensure your credentials are correct.",
          type: "error",
        },
      });
    }
  };

  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Paper className={classes.paper}>
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          label="Email"
          error={errors && errors?.email ? true : false}
          helperText={errors?.email}
          required
        />
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          label="Password"
          error={errors && errors?.password ? true : false}
          helperText={errors?.password}
          required
        />
        <Button
          onClick={(e) => handleSubmit(e)}
          variant="contained"
          style={{ marginTop: "1rem" }}
          color="primary"
        >
          Login
        </Button>
        <Typography variant="subtitle2">
          To create an account click <Link to="/register">Register</Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
