import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import AddIcon from "@material-ui/icons/Add";
import { blue } from "@material-ui/core/colors";
import { Button } from "@material-ui/core";
import useGlobalContext from "../../GlobalContext";
import Select from "./Select";
import axiosApi from "../../axiosApi";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  add: {
    color: blue[500],
    cursor: "pointer",
  },
}));

export default function AddTodoToGroup({ todo_id }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [group, setGroup] = React.useState("");

  const { completed_groups, incomplete_groups, dispatch, getCurrentUser } =
    useGlobalContext();
  const groups = completed_groups.concat(incomplete_groups);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();

    try {
      axiosApi
        .put(
          `todos/addToGroup/${todo_id}/${group._id}`,
          {},
          { withCredentials: true }
        )
        .then((res) => {
          getCurrentUser();
          dispatch({
            type: "SET_ALERT",
            payload: {
              open: true,
              message: "Todo was added to group successfully.",
              type: "success",
            },
          });
        })
        .catch((error) => {
          console.log(error.response);
          dispatch({
            type: "SET_ALERT",
            payload: {
              open: true,
              message:
                "Something went wrong while trying to add todo to a group.",
              type: "error",
            },
          });
        });
    } catch (error) {
      console.error(error.response.data);
      return dispatch({
        type: "SET_ALERT",
        payload: {
          open: true,
          message: "Something went wrong while trying to add todo to a group.",
          type: "error",
        },
      });
    }
  };

  const handleGroupChange = (event) => {
    setGroup(event.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log("add to group called", group._id);
  return (
    <>
      <AddIcon onClick={handleOpen} className={classes.add} />
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <Typography variant="h4" color="primary">
                Add To Group
              </Typography>

              <form className={classes.form} noValidate autoComplete="off">
                <Select
                  groups={groups}
                  group={group}
                  onGroupChange={handleGroupChange}
                />
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  color="primary"
                >
                  Add
                </Button>
              </form>
            </div>
          </Fade>
        </Modal>
      </div>
    </>
  );
}
