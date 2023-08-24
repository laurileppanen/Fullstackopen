import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: 'notifications',
    initialState: 'test',
    reducers: {
      createNotification(state, action) {
        return action.payload
      },
    }
  })
  
  
  export const {createNotification} = notificationSlice.actions
  export default notificationSlice.reducer