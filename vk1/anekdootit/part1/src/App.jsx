import { useState } from 'react'

const Votes = Array(8).fill(0)
const Copy = [...Votes]

const Display = ({ state }) => {
  return (
    <div>Has {state} votes</div>
  )
}

const Mostvoted = ( {anecdotes} ) => {
  console.log(Math.max(...Copy))
  const amount = Math.max(...Copy)
  const index = Copy.indexOf(amount)
  const mostVotedAnecdote = anecdotes[index]
  return (
    <div>
      <p> {mostVotedAnecdote} </p>
      <p>Has {amount} votes </p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [refresh, setRefresh] = useState(0)

  const handleClick = () => {
    const update = Math.floor(Math.random() * (Math.floor(7) - Math.floor(0) + 1)) + Math.ceil(0)
    setSelected(update)
  }

  const addVote = () => {
    Copy[selected] += 1
    console.log(Copy)
    setRefresh(refresh + 1)
  }

  return (
    <div>
      <font size="6">
        <b>Anecdote of the day</b>
      </font>
      <br></br>
      <br></br>
      {selected}: {anecdotes[selected]}
      <br></br>
      <br></br>
      <Display state={Copy[selected]} />
      <br></br>
      <br></br>
      <button onClick={addVote}>
        Vote
      </button>
      <p> </p>
      <button onClick={handleClick}>
        Next anecdote
      </button>
      <br></br>
      <br></br>
      <font size="6">
        <b>Anecdote with most votes</b>
      </font>
      <Mostvoted anecdotes={anecdotes}/>
    </div>
  )
}

export default App