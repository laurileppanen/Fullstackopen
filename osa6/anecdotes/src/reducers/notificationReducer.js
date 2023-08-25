import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: 'notifications',
    initialState: null,
    reducers: {
      setNotification(state, action){
        return action.payload
      },
      removeNotification() {
        return null
      }
    }
  })
  
  
  export const {setNotification, removeNotification} = notificationSlice.actions
  export default  notificationSlice.reducer