import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosApi from "./../axiosApi";
import useGlobalContext from "../GlobalContext";
import extractErrors from "./../validation/extractErrors";
import validateRegister from "./../validation/validateRegister";

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
  marginTop: {
    marginTop: "1rem",
  },
}));

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const { getCurrentUser, dispatch } = useGlobalContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email,
      username,
      password,
      confirm_password: confirmPassword,
    };
    const { error } = validateRegister(data);

    if (error) {
      return setErrors(extractErrors(error));
    }

    try {
      const res = await axiosApi.post("auth/register", data, {
        withCredentials: true,
      });

      if (!res.data) return;

      navigate("/dashboard");
      getCurrentUser();
    } catch (error) {
      console.log(error.response.data);
      dispatch({
        type: "SET_ALERT",
        payload: {
          open: true,
          message:
            "Something went wrong while trying to register. Ensure correct credentials.",
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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={classes.marginTop}
          type="text"
          label="Username"
          error={errors && errors?.username ? true : false}
          helperText={errors?.username}
          required
        />
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={classes.marginTop}
          type="password"
          label="Password"
          error={errors && errors?.password ? true : false}
          helperText={errors?.password}
          required
        />
        <TextField
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={classes.marginTop}
          type="password"
          label="Confirm Password"
          error={errors && errors?.confirm_password ? true : false}
          helperText={errors?.confirm_password}
          required
        />
        <Button
          onClick={(e) => handleSubmit(e)}
          variant="contained"
          className={classes.marginTop}
          color="primary"
        >
          Register
        </Button>
        <Typography variant="subtitle2">
          To create an account click <Link to="/login">Login</Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Register;
