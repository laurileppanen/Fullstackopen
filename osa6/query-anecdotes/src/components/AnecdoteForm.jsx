import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from "../requests"
import { useNotification } from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const { dispatch } = useNotification()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })
  
  const getId = () => (100000 * Math.random()).toFixed(0)

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    console.log('PITUUS:', content.length)
    if (content.length >= 5) {
      newAnecdoteMutation.mutate({ content, id: getId(), votes: 0 })
      dispatch({ type: 'SET_NOTIFICATION', payload: `anecdote '${content}' created` })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    }
    else {
      dispatch({ type: 'SET_NOTIFICATION', payload: 'too short anecdote, must have length 5 or more' })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    }
    
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
