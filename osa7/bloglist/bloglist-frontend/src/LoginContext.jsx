import { createContext, useReducer, useContext } from "react";

const UserContext = createContext();

const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.payload;
    case "REMOVE_USER":
      return null;
    default:
      return state;
  }
};

export const UserProvider = (props) => {
  const [state, dispatch] = useReducer(userReducer, null);

  return (
    <UserContext.Provider value={{ user: state, dispatch }}>
      {props.children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
