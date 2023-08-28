import { createSlice } from "@reduxjs/toolkit"

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload
      state.push({
        content,
        id: getId(),
        votes: 0,
      })
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
    }
  }
})


export const {createAnecdote, toggleVote, appendAnecdote} = anecdoteSlice.actions
export default anecdoteSlice.reducer