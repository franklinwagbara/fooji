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

        console.log("todoesRes", todosRes);
        if (todosRes.data) {
          dispatch({
            type: "SET_COMPLETED_TODOS",
            payload: todosRes.data.completed_todos,
          });

          dispatch({
            type: "SET_INCOMPLETE_TODOS",
            payload: todosRes.data.incomplete_todos,
          });
        }
      }
    } catch (error) {
      console.log(error?.response.data);
      /* dispatch({
        type: "SET_ALERT",
        payload: {
          open: true,
          message: "Something went wrong, when trying to get current user.",
          type: "error",
        },
      }); */
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
