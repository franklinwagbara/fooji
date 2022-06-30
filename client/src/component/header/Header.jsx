import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Button,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import useGlobalContext from "../../GlobalContext";

const Header = () => {
  const { user, logout } = useGlobalContext();
  let navigate = useNavigate();
  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Typography
            onClick={() => navigate("../", { replace: true })}
            style={{ flex: 1, cursor: "pointer" }}
            variant="h4"
          >
            TODO
          </Typography>
          {!user ? (
            <Button
              onClick={() => navigate("/login", { replace: true })}
              variant="contained"
              color="secondary"
            >
              Login
            </Button>
          ) : (
            <span>
              <Typography
                style={{ marginRight: "1.5rem", fontStyle: "italic" }}
                component="span"
                variant="subtitle1"
              >
                Welcome,
              </Typography>
              <Typography
                style={{ marginRight: "1.5rem" }}
                component="span"
                variant="h6"
              >
                {user?.username}
              </Typography>
              <Button
                onClick={() => {
                  const res = logout().t;

                  if (res.data) navigate("../login", { replace: true });
                  return;
                }}
                variant="outlined"
                color="secondary"
              >
                Logout
              </Button>
            </span>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
