import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        console.log('CONTENT:', content)
    
        dispatch(createAnecdote(content))
        dispatch(setNotification(`You added '${content}'`, 10))
      }

    return (
      <form onSubmit={addAnecdote}>
        <div>
          <h2>create new</h2>
          <input name="anecdote"/>
        </div>
        <button type="submit">create</button>
      </form>      
    )  
}

export default AnecdoteForm