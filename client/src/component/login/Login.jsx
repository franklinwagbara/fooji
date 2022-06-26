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
  const [error, setError] = useState(null);

  const { user } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  console.log("user: ", user);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await axiosApi.post("auth/login", { email, password });

      console.log(res);
      setLoading(false);
    } catch (error) {
      console.log("error catching: ", error.response.data);
      setError(error);
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
        />
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          label="Password"
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
