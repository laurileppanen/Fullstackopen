import { useState } from 'react'

const Header = (props) => (
  <div>
    <h1>{props.header}</h1>
  </div>
)

const StatisticLine = (props) => {
  return (
    <tr>
      
      <td>{props.text}</td> <td>{props.value}</td> {props.percentage}
    
    </tr>
      
  )
}

const Statistics = (props) => {
  if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
    return (
    <div>
      No feedback given
    </div>
    )
  }

  return (

      <div>
        <table>
          <tbody>
      <StatisticLine text="good" value={props.good}/>
      
      <StatisticLine text="neutral" value={props.neutral}/>
      
      <StatisticLine text="bad" value={props.bad}/> 
      <StatisticLine text="all" value={props.all}/>
      <StatisticLine text="average" value={props.average}/>
      <StatisticLine text="positive" value={props.percentage} percentage="%"/>
      </tbody>
      </table>
      </div>
    
    
  )
}

const Button = ({ handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good+1)
  } 

  const handleNeutralClick = () => {
    setNeutral(neutral+1)
  }

  const handleBadClick = () => {
    setBad(bad+1)
  }

  const average = (good-bad) / (good+bad+neutral)
  const total = good+bad+neutral
  const prosent = (good/total)*100

  return(
    <div>
      <Header header="Give feedback"/>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />

      <Header header="Statistics"/>
      <Statistics good={good} neutral={neutral} bad={bad} all={total} average={average} percentage={prosent} />
      
    </div>

    
  )
}

export default App;
