const Notification = ({ message, successMessage }) => {
  if (message === null && successMessage === null) {
    return null
  }

  const className = message ? 'error' : 'success'
  const displayMessage = message || successMessage

  return(
    <div className={className}> {displayMessage} </div>
  )
}


export default Notification