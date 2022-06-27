import { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import useGlobalContext from "../../GlobalContext";

function CustomAlert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Alert() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const { alert } = useGlobalContext();

  useEffect(() => {
    setOpen(alert.open);
  }, [alert]);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <CustomAlert onClose={handleClose} severity={alert.type}>
          {alert.message}
        </CustomAlert>
      </Snackbar>
    </div>
  );
}
