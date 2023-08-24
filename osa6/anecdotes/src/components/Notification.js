import { useSelector } from 'react-redux'
import { createNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const steitti = useSelector(state => state)
  console.log('STEITTI:', steitti)
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification