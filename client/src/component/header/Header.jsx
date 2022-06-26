import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Button,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Header = ({ user = true }) => {
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
          {user ? (
            <Button
              onClick={() => navigate("/login", { replace: true })}
              variant="contained"
              color="secondary"
            >
              Login
            </Button>
          ) : (
            "Logout"
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
