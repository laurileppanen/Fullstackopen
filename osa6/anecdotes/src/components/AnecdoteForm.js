import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        console.log('CONTENT:', content)
    
        dispatch(createAnecdote(content))
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