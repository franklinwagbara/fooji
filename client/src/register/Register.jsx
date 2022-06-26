import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";

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
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Paper className={classes.paper}>
        <TextField type="text" label="Email" />
        <TextField className={classes.marginTop} type="text" label="Username" />
        <TextField
          className={classes.marginTop}
          type="password"
          label="Password"
        />
        <TextField
          className={classes.marginTop}
          type="password"
          label="Confirm Password"
        />
        <Button
          variant="contained"
          className={classes.marginTop}
          color="primary"
        >
          Login
        </Button>
        <Typography variant="subtitle2">
          To create an account click <Link to="/login">Login</Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Register;
