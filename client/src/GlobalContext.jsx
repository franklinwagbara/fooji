import { createContext, useReducer, useContext, useEffect } from "react";
import axiosApi from "./axiosApi";

const initialState = {
  user: null,
  fetchingUser: true,
  alert: null,
  completedTodos: [],
  incompletedTodos: [],
  completedGroups: [],
  incompletedGroups: [],
};

const globalReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        fetchingUser: false,
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
      console.log("logging...");
      const res = await axiosApi.get("auth/current");

      console.log("asking...", res.user);
      if (res.data) {
        const todosRes = await axiosApi.get("/todos/current");

        dispatch({ type: "SET_USER", payload: res.user });

        if (todosRes.data) {
          //dispatch({  });
        }
      }
    } catch (error) {
      console.log(error?.response?.data);
      //todo: update state with error
    }
  };

  const value = {
    ...state,
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
