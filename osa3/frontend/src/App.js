import { useState, useEffect } from 'react'
import personService from './services/persons'

import Filter from './components/Filter'
import Persons from './components/Persons'
import NewPerson from './components/NewPerson'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newSearch, setNewSearch] = useState('') 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


  const addPerson = event => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber,
      id: Math.floor(Math.random() * 101)
    }

    if (persons.filter(person => person.name.toUpperCase() === newName.toUpperCase()).length > 0) {
      const originalPerson = persons.find(person => person.name.toUpperCase() === newName.toUpperCase())
      const changedPerson = { ...originalPerson, number: newNumber}

      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(originalPerson.id, changedPerson)
          .then(() => {
            setPersons(persons.map(person => (person.id === changedPerson.id ? changedPerson : person)))
          })

          .catch(error => {
            setErrorMessage(
              `Information of '${newName}' has already been removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000) 
            setPersons(persons.filter(person => person.id !== changedPerson.id))
          })

          setSuccessMessage(`'${newName}'s number changed`)
          
          setTimeout(() => {
            setSuccessMessage(null)
          }, 3000)  
      }
      
      setNewName('')
      setNewNumber('')
      console.log(originalPerson.id)
      console.log(changedPerson.id) 
    }  
    
    else {      
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))

      })

      .catch(error => {
        console.log(error.response.data.error)
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
        setSuccessMessage(`Added '${newName}'`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 3000)
      
      
      setNewName('')
      setNewNumber('')
    }

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
    
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  const handleDeletePerson = (name, id) => {
    return() => {
    
    if (window.confirm(`Delete ${name} ?`)) {
      const person = persons.find(person => person.id === id)
      console.log(person.id)
      
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setSuccessMessage(`Name '${name}' deleted`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 3000)

        })
    
      .catch(error => {
        setErrorMessage(`Deleting '${name}' failed`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)

      })
      
    }
  }}

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} successMessage={successMessage}/>
      <Filter newSearch={newSearch} handleSearchChange={handleSearchChange}/>

      <h2>add a new</h2>
      <NewPerson
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      
      <h2>Numbers</h2>
       
       <Persons
         persons={persons}
         newSearch={newSearch}
         handleDeletePerson={handleDeletePerson}
       />  
    </div>
  )
  }


export default App
