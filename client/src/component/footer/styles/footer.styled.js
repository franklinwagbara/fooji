import { makeStyles } from "@material-ui/core/styles";

const useFooterStyle = makeStyles((theme) => ({
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
export default useFooterStyle;
