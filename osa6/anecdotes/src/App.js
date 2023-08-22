import { useSelector, useDispatch } from 'react-redux'
import {toggleVote, createAnecdote} from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    const aanestettava = anecdotes.find(oikea => oikea.id===id)
    console.log('Äänestettävänä:', aanestettava)

    const aanet = aanestettava.votes
    const iidee = aanestettava.id
    console.log('Annetut äänet:', aanet)
    dispatch(toggleVote(iidee))
    
  }

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value=''
    console.log('CONTENT:', content)

    dispatch(createAnecdote(content))
  }

  anecdotes.sort((a,b) => b.votes - a.votes)

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote"/>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App