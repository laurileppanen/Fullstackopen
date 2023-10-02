import { createContext, useContext, useReducer } from "react";

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return {
        message: action.payload.message,
        type: action.payload.type,
      };
    case "CLEAR_NOTIFICATION":
      return null;
    default:
      return state;
  }
};

export const NotificationProvider = (props) => {
  const [state, dispatch] = useReducer(notificationReducer, null);

  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  return useContext(NotificationContext);
};
