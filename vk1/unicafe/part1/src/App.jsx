import { useState } from 'react'

const Button = ({ action, text}) => {
  return(
    <div>
      <font size="6">
      <button onClick={action}>
        {text}
      </button>
      </font>
    </div>
  )
}

const StatisticLine = ({ text, state }) => {
    return (
      <p>{text} {state}</p>
  )
}

const Statistics = ({ total, good, neutral, bad }) => {
  if (total > 0) {
    return ( 
      <table>
        <tbody>
          <tr>
            <td><StatisticLine state={good} text="Good"/></td>
          </tr>
          <tr>
            <td><StatisticLine state={neutral} text="Neutral"/></td>
          </tr>
          <tr>
            <td><StatisticLine state={bad} text="Bad"/></td>
          </tr>
          <tr>
            <td><StatisticLine state={good + neutral + bad} text="All" /></td>
          </tr>
          <tr>
            <td><StatisticLine state={(good * 1 + bad * -1) / (good + neutral + bad)} text="Average" /></td>
          </tr>
          <tr>
            <td><StatisticLine state={(good) / (good + neutral + bad) * 100} text="Positive (%)" /></td>
          </tr>
        </tbody>
      </table>
    )
  }
  return (
    <p>No feedback given</p>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const countTotal = good + neutral + bad

  return (
    <div>
      <font size="6">
        <b>Give feedback<br /> </b>
      </font>
      <Button action={() => setGood(good + 1)} text="Good"/>
      <Button action={() => setNeutral(neutral + 1)} text="Neutral"/>
      <Button action={() => setBad(bad + 1)} text="Bad"/>
      <font size="6">
        <b><br /><br />Statistics:</b>
      </font>
      <Statistics total={countTotal} good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App