import {useState, useEffect} from 'react'
import countryService from './services/countries'
import Countries from './components/Countries'
import Filter from './components/Filter'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newSearch, setNewSearch] = useState('')

  
  console.log(process.env.REACT_APP_API_KEY)
  useEffect(() => {
    countryService
      .getAll()
        .then(initialCountries => {
          setCountries(initialCountries)
        })
  }, [])

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
    console.log(event.target.value)
  }

  return (
    <div>
      <Filter 
        newSearch={newSearch} 
        handleSearchChange={handleSearchChange}
      />

      <Countries 
        countries={countries} 
        newSearch={newSearch} 
      />  
        
    </div>
  )
}

export default App;
