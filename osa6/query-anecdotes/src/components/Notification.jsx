import { useNotification } from "../NotificationContext"

const Notification = () => {
  const { state } = useNotification()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (!state) return null

  return (
    <div style={style}>
      {state}
    </div>
  )
}

export default Notification
