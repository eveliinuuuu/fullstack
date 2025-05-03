import { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'

const Filter = ({ handleFilter }) => {
  return (
    <div>
      Filter shown with <input onChange={handleFilter} />
    </div>
  )
}

const PersonForm = ({ addContact, handleContactChange, handleNumberChange, newName, newNumber }) => {
  return (
    <form onSubmit={addContact}>
        <div>
          Name: <input value={newName} onChange={handleContactChange}/>
        </div>
        <br></br>
        <div>
          Number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <br></br>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
  )
}

const Numbers = ({ contactsToShow, removeContact }) => {
  return (
    <ul>
      {contactsToShow.map(person => <li key={person.id}>{person.name} {person.number} <button onClick={() => removeContact(person.id)}> Delete </button></li>)}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('Add name...')
  const [newNumber, setNewNumber] = useState('Add number...')
  const [showAll, setShowAll] = useState(true)
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
    })
  }, [])

  const addContact = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName, 
      number: newNumber,
    }

    console.log(personObject)

    personService.getAll()
    .then((existingPersons) => {
      const found = existingPersons.find((person) => person.name === newName)
      return found})
    .then((found) => {
      if (found !== undefined) {
        const id = found.id
        personService.update(id, personObject)
        .then((returnedPersons) => {
          personService.getAll().then((initialPersons) => {
            setPersons(initialPersons)
          })
          .then(setNewName("Add name..."))
          .then(setNewNumber("Add number..."))
          .then(setMessage(`Updated ${personObject.name}`))
          .then(setTimeout(() => {
            setMessage(null)
          }, 3000))
        })
        .catch(error => {
          setMessage(error.response.data.error)
          setTimeout(() => {
            setMessage(null)
          }, 6000)
        })
      } else {
        personService.create(personObject)
        .then((returnedPersons) => {
        personService.getAll().then((initialPersons) => {
          setPersons(initialPersons)
        })
        .then(setNewName("Add name..."))
        .then(setNewNumber("Add number..."))
        .then(setMessage(`Added name`))
        .then(setTimeout(() => {
          setMessage(null)
        }, 3000))
    })
    .catch(error => {
      setMessage(error.response.data.error)
      setTimeout(() => {
        setMessage(null)
      }, 6000)
    })   
  }})}

  const handleContactChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setNewFilter(event.target.value)
    const filter = event.target.value
    if (! (filter === '')) {
        setShowAll(false)
    } else {
      setShowAll(true)
  }}

  const contactsToShow = showAll
  ? persons
  : persons.filter(persons => persons.name.startsWith(newFilter))

  
  const removeContact = (props) => {
      const idToDelete = props
      console.log(`id to delete ${idToDelete}`)

      const found = persons.find((person) => person.id === props)
      console.log(found.name)
      confirm(`Delete ${found.name} ?`)

      personService.remove(idToDelete)

      const remainingPersons = persons.filter((person) => (! (person.id === idToDelete)))
      console.log(remainingPersons)
      setPersons(remainingPersons)

      setMessage(`Deleted ${found.name}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter}/>
      <h2>Add new contact</h2>
      <Notification message={message} />
      <PersonForm addContact={addContact} handleContactChange={handleContactChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      <Numbers contactsToShow={contactsToShow} removeContact={removeContact}/>
    </div>
  )

}

export default App