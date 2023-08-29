const SET_NOTIFICATION = 'SET_NOTIFICATION'
const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION'

export const setNotification = (teksti, aika) => {
  return dispatch => {
    dispatch({
      type: SET_NOTIFICATION,
      data: teksti,
    })
    setTimeout(() => {
      dispatch({
        type: REMOVE_NOTIFICATION,
      })
    }, aika*1000)
  }
}

export const removeNotification = () => {
  return {
    type: REMOVE_NOTIFICATION
  }
}

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case SET_NOTIFICATION:
      return action.data
    case REMOVE_NOTIFICATION:
      return null
    default:
      return state    
  }
}

  export default  notificationReducer