import { createContext, useReducer, useContext, useEffect } from "react";
import axiosApi from "./axiosApi";
import { axios } from "axios";

const initialState = {
  user: null,
  fetching_user: true,
  alert: {
    open: false,
    message: "",
    type: "success",
  },
  completed_todos: [],
  incomplete_todos: [],
  completed_groups: [],
  incomplete_groups: [],
};

const globalReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        fetchingUser: false,
      };
    case "SET_COMPLETED_TODOS":
      return {
        ...state,
        completed_todos: action.payload,
      };
    case "SET_INCOMPLETE_TODOS":
      return {
        ...state,
        incomplete_todos: action.payload,
      };
    case "SET_COMPLETED_GROUPS":
      return {
        ...state,
        completed_groups: action.payload,
      };
    case "SET_INCOMPLETE_GROUPS":
      return {
        ...state,
        incomplete_groups: action.payload,
      };
    case "SET_ALERT":
      return {
        ...state,
        alert: action.payload,
      };
    case "RESET_USER":
      return {
        ...state,
        user: null,
        fetching_user: false,
        completed_todos: [],
        incomplete_todos: [],
        completed_groups: [],
        incomplete_groups: [],
      };
    default:
      return state;
  }
};

const GlobalContext = createContext(initialState);

export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    try {
      const res = await axiosApi.get("auth/current", { withCredentials: true });

      if (res.data) {
        dispatch({ type: "SET_USER", payload: res.data });

        const todosRes = await axiosApi.get("todos/current", {
          withCredentials: true,
        });

        const groupsRes = await axiosApi.get("groups/current", {
          withCredentials: true,
        });

        console.log("groups....", groupsRes);
        if (todosRes.data && groupsRes.data) {
          dispatch({
            type: "SET_COMPLETED_TODOS",
            payload: todosRes.data.completed_todos,
          });

          dispatch({
            type: "SET_INCOMPLETE_TODOS",
            payload: todosRes.data.incomplete_todos,
          });

          dispatch({
            type: "SET_COMPLETED_GROUPS",
            payload: groupsRes.data.completed_groups,
          });

          dispatch({
            type: "SET_INCOMPLETE_GROUPS",
            payload: groupsRes.data.incomplete_groups,
          });
        }
      }
    } catch (error) {
      console.log(error?.response.data);
    }
  };

  const handleComplete = (id, completed, type) => {
    try {
      const res = axiosApi
        .put(
          `${type === "group" ? "groups" : "todos"}/${id}/${
            completed ? "complete" : "incomplete"
          }`,
          {},
          { withCredentials: true }
        )
        .then((res) => {
          getCurrentUser();
          dispatch({
            type: "SET_ALERT",
            payload: {
              open: true,
              message: "Todo completion status update was successful.",
              type: "success",
            },
          });
        })
        .catch((error) => {
          console.log(error?.response.data);
          dispatch({
            type: "SET_ALERT",
            payload: {
              open: true,
              message:
                "Something went while trying to update todo completion status.",
              type: "error",
            },
          });
        });
    } catch (error) {
      console.log(error?.response.data);
      dispatch({
        type: "SET_ALERT",
        payload: {
          open: true,
          message:
            "Something went while trying to update todo completion status.",
          type: "error",
        },
      });
    }
  };

  const handleDelete = (id, type) => {
    try {
      if (type && type === "group") {
        console.error("in handle delete group", type);
        axiosApi
          .put(`todos/removeFromGroup/${id}`, {}, { withCredentials: true })
          .then((res) => {
            getCurrentUser();
            dispatch({
              type: "SET_ALERT",
              payload: {
                open: true,
                message: "Todo was successfully removed from group.",
                type: "success",
              },
            });
          })
          .catch((error) => {
            console.error(error?.response.data);
            dispatch({
              type: "SET_ALERT",
              payload: {
                open: true,
                message: "Something went while trying to delete todo.",
                type: "error",
              },
            });
          });
        return;
      }

      axiosApi
        .delete(`todos/${id}`, { withCredentials: true })
        .then((res) => {
          getCurrentUser();
          dispatch({
            type: "SET_ALERT",
            payload: {
              open: true,
              message: "Todo deletion was successful.",
              type: "success",
            },
          });
        })
        .catch((error) => {
          console.log(error?.response.data);
          dispatch({
            type: "SET_ALERT",
            payload: {
              open: true,
              message: "Something went while trying to delete todo.",
              type: "error",
            },
          });
        });
    } catch (error) {
      console.log(error?.response.data);
      dispatch({
        type: "SET_ALERT",
        payload: {
          open: true,
          message: "Something went while trying to delete todo.",
          type: "error",
        },
      });
    }
  };

  const handleEdit = (
    id,
    editorState,
    editorDispatch,
    newValue,
    is_completed,
    type
  ) => {
    if (editorState.value === "submit") {
      try {
        axiosApi
          .put(
            `todos/${id}`,
            {
              task: newValue,
              is_completed,
            },
            { withCredentials: true }
          )
          .then((res) => {
            getCurrentUser();
            dispatch({
              type: "SET_ALERT",
              payload: {
                open: true,
                message: "Todo update was successful.",
                type: "success",
              },
            });
          })
          .catch((error) => {
            console.log(error);
            dispatch({
              type: "SET_ALERT",
              payload: {
                open: true,
                message: "Something went wrong while trying to update todo.",
                type: "error",
              },
            });
          });
      } catch (error) {
        console.log(error.response.data);
        dispatch({
          type: "SET_ALERT",
          payload: {
            open: true,
            message: "Something went wrong while trying to update todo.",
            type: "error",
          },
        });
      }

      editorDispatch({ type: "NEXT" });
    }
  };

  const logout = async () => {
    try {
      await axiosApi.put("auth/logout", {}, { withCredentials: true });
      dispatch({ type: "RESET_USER", payload: null });
      dispatch({
        type: "SET_ALERT",
        payload: {
          open: true,
          message: "You've been logged successfully.",
          type: "success",
        },
      });
      getCurrentUser();
    } catch (error) {
      console.log(error?.response.data);
      dispatch({
        type: "SET_ALERT",
        payload: {
          open: true,
          message: "Something went wrong, when trying to get current user.",
          type: "error",
        },
      });
    }
  };

  const value = {
    ...state,
    getCurrentUser,
    logout,
    dispatch,
    handleComplete,
    handleDelete,
    handleEdit,
  };
  return (
    <GlobalContext.Provider value={value}>
      {props.children}
    </GlobalContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(GlobalContext);
};
export default useGlobalContext;
