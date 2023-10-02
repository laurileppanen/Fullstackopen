import { useNotification } from "../NotificationContext";

const Notification = () => {
  const { state } = useNotification();

  if (!state) return null;

  const className = state.type === "error" ? "error" : "success";

  return <div className={className}>{state.message}</div>;
};

export default Notification;
