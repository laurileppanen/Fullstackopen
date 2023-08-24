import { createSlice } from "@reduxjs/toolkit"

const filterSlice = createSlice({
  name: 'filter',
  initialState: 'ALL',
  reducers: {
    filterChange(state, action) {
      console.log('moi')
      const content = action.payload
      return content
    }
  }
})

export const { filterChange } = filterSlice.actions
export default filterSlice.reducer
   