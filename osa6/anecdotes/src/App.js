import { useSelector, useDispatch } from 'react-redux'
import {toggleVote} from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'

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
      <AnecdoteForm />  
    </div>
  )
}

export default App