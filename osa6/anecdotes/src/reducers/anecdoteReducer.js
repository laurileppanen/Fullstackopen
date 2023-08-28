import { createSlice } from "@reduxjs/toolkit"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    toggleVote(state, action) {
      const id = action.payload
      console.log('AIDIIII:', id)
      const anecdoteToChange = state.find(n => n.id === id)
      const selko = JSON.parse(JSON.stringify(anecdoteToChange))
      const changedAnecdote = {
        ...selko,
        votes: selko.votes+1 
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})


export const {createAnecdote, toggleVote, appendAnecdote, setAnecdotes} = anecdoteSlice.actions
export default anecdoteSlice.reducer