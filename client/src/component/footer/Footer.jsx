import { Typography } from "@material-ui/core";
import useFooterStyle from "./styles/footer.styled";

const Footer = () => {
  const classes = useFooterStyle();
  return (
    <div className={classes.root}>
      <Typography variant="subtitle2">
        @dev-assignment submission by Franklin Wagbara
      </Typography>
    </div>
  );
};

export default Footer;
