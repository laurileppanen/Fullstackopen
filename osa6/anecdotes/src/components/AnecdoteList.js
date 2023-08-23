import { useSelector, useDispatch } from 'react-redux'
import { toggleVote } from '../reducers/anecdoteReducer'

const Vote = ({anecdote, handleClick}) => {
    console.log('ANEKDOOTTI:', anecdote)
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
    const anecdotes = useSelector(state => state)

    anecdotes.sort((a,b) => b.votes - a.votes)

    return(
      <div>
        <br />
        {anecdotes.map(anecdote =>
          <Vote
            key = {anecdote.id}
            anecdote = {anecdote}
            handleClick={() =>
              dispatch(toggleVote(anecdote.id))
            }   
          /> 
        )}
      </div>
    )
}

export default AnecdoteList