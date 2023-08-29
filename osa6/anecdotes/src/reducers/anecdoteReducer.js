import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
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


export const {appendAnecdote, setAnecdotes, toggleVote} = anecdoteSlice.actions


export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = id => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update(id)
    dispatch(toggleVote(updatedAnecdote.id))
  }
}

export default anecdoteSlice.reducer