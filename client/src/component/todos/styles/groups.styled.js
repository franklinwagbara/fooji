import { makeStyles } from "@material-ui/core/styles";

const useGroupsStyle = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: "0.2rem",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));
export default useGroupsStyle;
