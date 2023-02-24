import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(Array(7).fill(0))
  

  const handleRandomClick = () => {
    setSelected(Math.floor(Math.random()*anecdotes.length))
  
  }


  const voteClick = () => {
    const copy = [...vote]
    copy[selected] += 1
    setVote(copy)
    
  }

  const max = Math.max(...vote)
  const maxVote = anecdotes[vote.indexOf(Math.max(...vote))]


  return (
    <div>
      <div>
        <h2>
          Anecdote of the day
        </h2>
      </div>
      {anecdotes[selected] }
      <div>
        has {vote[selected]} votes
      </div>
      <div>
      <button onClick={voteClick}>
        vote
      </button>
      <button onClick={handleRandomClick} >
        next anecdote
      </button> 
      </div>
    <div>
      <h2>
        Anecdote with most votes
      </h2>
      {maxVote}
      <div>
        has {max} votes
      </div>

    </div>  

    </div>
  )
}

export default App
