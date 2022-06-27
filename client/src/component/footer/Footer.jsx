import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.dark,
    bottom: "0px",
    width: "100%",
    height: "10rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontStyle: "italic",
    marginTop: "2rem",
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="subtitle2">
        @dev-assignment submission by Franklin Wagbara
      </Typography>
    </div>
  );
};

export default Footer;
