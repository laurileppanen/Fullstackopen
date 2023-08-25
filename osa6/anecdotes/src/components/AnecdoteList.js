import { useSelector, useDispatch } from 'react-redux'
import { toggleVote } from '../reducers/anecdoteReducer'

import { setNotification, removeNotification } from '../reducers/notificationReducer'

const Anecdote = ({anecdote, handleClick}) => {
    return(
      <div>
        {anecdote.content}
        <div> 
          has {anecdote.votes}
          <button onClick={handleClick}>  
            vote  
          </button>
        </div>  
          
      </div>
    )
    
  }


const AnecdoteList = () => {
    const dispatch = useDispatch()
    const filter = useSelector(state => state.filter)
    const anecdotes = useSelector(state => {
      if (filter === 'ALL') return state.anecdotes

      return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    })  
 
    const sortedAnecdotes = [...anecdotes].sort((a,b) => b.votes - a.votes)

    return(
      <div>
        <br />
        {sortedAnecdotes.map(anecdote =>
          <Anecdote
            key = {anecdote.id}
            anecdote = {anecdote}
            handleClick={() => {
              dispatch(toggleVote(anecdote.id))
              dispatch(setNotification(`You voted '${anecdote.content}'`))
              setTimeout(() => {
                dispatch(removeNotification())
              }, 5000)
            }}   
          /> 
        )}
      </div>
    )
}

export default AnecdoteList